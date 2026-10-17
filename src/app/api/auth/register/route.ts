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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      name,
      phone,
      salonName,
      businessType,
      address,
      city,
      state,
      pincode,
      gstNumber,
      licenseNumber,
    } = body;

    if (!email || !password || !name || !phone || !salonName || !businessType || !address || !city || !state || !pincode) {
      return NextResponse.json(
        { error: "Please fill out all mandatory salon and verification fields." },
        { status: 400 }
      );
    }

    const users = getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in or check your verification status." },
        { status: 400 }
      );
    }

    const newUser: SalonUser = {
      id: `usr-${Date.now()}`,
      email: email.trim().toLowerCase(),
      password: password,
      name: name.trim(),
      phone: phone.trim(),
      role: "salon_pro",
      status: "pending", // All new salon accounts require admin review
      salonName: salonName.trim(),
      businessType,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      gstNumber: gstNumber ? gstNumber.trim() : undefined,
      licenseNumber: licenseNumber ? licenseNumber.trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Return safe user without raw password
    const safeUser = { ...newUser };
    delete (safeUser as { password?: string }).password;
    return NextResponse.json({
      success: true,
      message: "Salon registration submitted! Your account is now under review by our admin team.",
      user: safeUser,
    });
  } catch (error: any) {
    console.error("Register API error:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
