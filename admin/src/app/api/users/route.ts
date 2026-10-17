import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getUsersFilePath() {
  const localPath = path.resolve(process.cwd(), "../src/data/users.json");
  if (fs.existsSync(localPath)) return localPath;
  return path.resolve(process.cwd(), "src/data/users.json");
}

function getUsers() {
  try {
    const fileContent = fs.readFileSync(getUsersFilePath(), "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

function saveUsers(users: any[]) {
  fs.writeFileSync(getUsersFilePath(), JSON.stringify(users, null, 2), "utf-8");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase();

    let users = getUsers();

    if (status && status !== "all") {
      users = users.filter((u: any) => u.status === status);
    }

    if (search) {
      users = users.filter(
        (u: any) =>
          u.salonName?.toLowerCase().includes(search) ||
          u.name?.toLowerCase().includes(search) ||
          u.email?.toLowerCase().includes(search) ||
          u.city?.toLowerCase().includes(search) ||
          (u.gstNumber && u.gstNumber.toLowerCase().includes(search))
      );
    }

    const allUsers = getUsers();
    return NextResponse.json({
      users,
      total: users.length,
      counts: {
        all: allUsers.length,
        pending: allUsers.filter((u: any) => u.status === "pending").length,
        approved: allUsers.filter((u: any) => u.status === "approved").length,
        rejected: allUsers.filter((u: any) => u.status === "rejected").length,
      },
    });
  } catch (error: any) {
    console.error("Admin API GET users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, rejectionReason, salonName, city, state, phone, businessType } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const users = getUsers();
    const index = users.findIndex((u: any) => u.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const targetUser = users[index];
    if (status) targetUser.status = status;
    if (rejectionReason !== undefined) targetUser.rejectionReason = rejectionReason;
    if (salonName) targetUser.salonName = salonName;
    if (city) targetUser.city = city;
    if (state) targetUser.state = state;
    if (phone) targetUser.phone = phone;
    if (businessType) targetUser.businessType = businessType;

    users[index] = targetUser;
    saveUsers(users);

    return NextResponse.json({
      success: true,
      message: `User status updated to ${targetUser.status}`,
      user: targetUser,
    });
  } catch (error: any) {
    console.error("Admin API PUT user error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    let users = getUsers();
    const initialLen = users.length;
    users = users.filter((u: any) => u.id !== id);

    if (users.length === initialLen) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    saveUsers(users);
    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Admin API DELETE user error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
