import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SalonUser } from "@/types/user";

const usersFilePath = path.join(process.cwd(), "src/data/users.json");

function getUsers(): SalonUser[] {
  try {
    const fileContent = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(fileContent) as SalonUser[];
  } catch {
    return [];
  }
}

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

    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { error: "No salon trade account found with this email. Please apply for a trade account." },
        { status: 401 }
      );
    }

    if (user.password && user.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password. Please verify your credentials." },
        { status: 401 }
      );
    }

    const safeUser = { ...user };
    delete (safeUser as { password?: string }).password;

    return NextResponse.json({
      success: true,
      user: safeUser,
      status: safeUser.status,
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Failed to process login" },
      { status: 500 }
    );
  }
}
