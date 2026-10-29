import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { usersStore } from "./stores";
import { SalonUser } from "@/types/user";

export const SESSION_COOKIE = "beupros_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set in production");
  }
  return "dev-only-insecure-secret";
}

const b64 = (s: string) => Buffer.from(s).toString("base64url");
const sign = (data: string) => createHmac("sha256", secret()).update(data).digest("base64url");

export function signToken(userId: string): string {
  const payload = b64(JSON.stringify({ uid: userId, exp: Math.floor(Date.now() / 1000) + MAX_AGE_SEC }));
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof uid !== "string" || typeof exp !== "number" || exp < Date.now() / 1000) return null;
    return uid;
  } catch {
    return null;
  }
}

function tokenFromRequest(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  const cookie = request.headers.get("cookie") || "";
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

/** Resolves the logged-in user (fresh from the DB, so role/status changes apply immediately). */
export async function getSessionUser(request: Request): Promise<SalonUser | null> {
  const token = tokenFromRequest(request);
  if (!token) return null;
  const uid = verifyToken(token);
  if (!uid) return null;
  return usersStore.get(uid);
}

export const stripPassword = (u: SalonUser) => {
  const copy = { ...u };
  delete (copy as { password?: string }).password;
  return copy;
};

type Need = "admin" | "approved";

/** Returns the user, or a 401/403 NextResponse to return straight from the handler. */
export async function requireUser(request: Request, need?: Need): Promise<SalonUser | NextResponse> {
  const user = await getSessionUser(request);
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (need === "admin" && user.role !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }
  if (need === "approved" && user.role !== "admin" && user.status !== "approved") {
    return NextResponse.json({ error: "Your trade account must be approved before ordering." }, { status: 403 });
  }
  return user;
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}
