import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { SalonUser } from "@/types/user";
import { usersStore } from "@/lib/stores";

export async function GET(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // all, pending, approved, rejected
    const search = searchParams.get("search")?.toLowerCase();

    const allUsers = await usersStore.all();
    let users = allUsers;

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
        all: allUsers.length,
        pending: allUsers.filter((u) => u.status === "pending").length,
        approved: allUsers.filter((u) => u.status === "approved").length,
        rejected: allUsers.filter((u) => u.status === "rejected").length,
      },
    });
  } catch (error: any) {
    console.error("Admin GET users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const body = await request.json();
    const { id, status, rejectionReason, salonName, city, state, phone, businessType } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const targetUser = await usersStore.get(id);

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (status) targetUser.status = status;
    if (rejectionReason !== undefined) targetUser.rejectionReason = rejectionReason;
    if (salonName) targetUser.salonName = salonName;
    if (city) targetUser.city = city;
    if (state) targetUser.state = state;
    if (phone) targetUser.phone = phone;
    if (businessType) targetUser.businessType = businessType;

    await usersStore.put(targetUser);

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
    const admin = await requireUser(request, "admin");
    if (admin instanceof Response) return admin;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (!(await usersStore.remove(id))) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Admin DELETE user error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
