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

function saveUsers(users: SalonUser[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // all, pending, approved, rejected
    const search = searchParams.get("search")?.toLowerCase();

    let users = getUsers();

    if (status && status !== "all") {
      users = users.filter((u) => u.status === status);
    }

    if (search) {
      users = users.filter(
        (u) =>
          u.salonName.toLowerCase().includes(search) ||
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search) ||
          u.city.toLowerCase().includes(search) ||
          (u.gstNumber && u.gstNumber.toLowerCase().includes(search))
      );
    }

    // Strip passwords before returning
    const safeUsers = users.map((u) => {
      const copy = { ...u };
      delete (copy as { password?: string }).password;
      return copy;
    });

    return NextResponse.json({
      users: safeUsers,
      total: safeUsers.length,
      counts: {
        all: getUsers().length,
        pending: getUsers().filter((u) => u.status === "pending").length,
        approved: getUsers().filter((u) => u.status === "approved").length,
        rejected: getUsers().filter((u) => u.status === "rejected").length,
      },
    });
  } catch (error: any) {
    console.error("Admin GET users error:", error);
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
    const index = users.findIndex((u) => u.id === id);

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

    const safeUser = { ...targetUser };
    delete (safeUser as { password?: string }).password;
    return NextResponse.json({
      success: true,
      message: `User status updated to ${targetUser.status}`,
      user: safeUser,
    });
  } catch (error: any) {
    console.error("Admin PUT user error:", error);
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
    const initialLength = users.length;
    users = users.filter((u) => u.id !== id);

    if (users.length === initialLength) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    saveUsers(users);
    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Admin DELETE user error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
