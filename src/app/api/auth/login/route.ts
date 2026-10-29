import { NextResponse } from "next/server";
import { setSessionCookie, signToken } from "@/lib/auth";
import { usersStore } from "@/lib/stores";
import { hashPassword, needsRehash, verifyPassword } from "@/lib/password";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const users = await usersStore.all();
    const user = users.find(
      (u) => u.email.toLowerCase() === String(email).trim().toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { error: "No salon trade account found with this email. Please apply for a trade account." },
        { status: 401 }
      );
    }

    if (!user.password || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { error: "Incorrect password. Please verify your credentials." },
        { status: 401 }
      );
    }

    // Upgrade legacy plaintext passwords to bcrypt on successful login
    if (needsRehash(user.password)) {
      user.password = await hashPassword(password);
      await usersStore.put(user);
    }

    const safeUser = { ...user };
    delete (safeUser as { password?: string }).password;

    const token = signToken(safeUser.id);
    const res = NextResponse.json({
      success: true,
      user: safeUser,
      status: safeUser.status,
      token,
    });
    setSessionCookie(res, token);
    return res;
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Failed to process login" },
      { status: 500 }
    );
  }
}
