import { NextResponse } from "next/server";
import { setSessionCookie, signToken } from "@/lib/auth";
import { SalonUser } from "@/types/user";
import { usersStore } from "@/lib/stores";
import { hashPassword } from "@/lib/password";

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

    const users = await usersStore.all();
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
      password: await hashPassword(password),
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

    await usersStore.put(newUser);

    // Return safe user without raw password
    const safeUser = { ...newUser };
    delete (safeUser as { password?: string }).password;
    const token = signToken(safeUser.id);
    const res = NextResponse.json({
      success: true,
      message: "Salon registration submitted! Your account is now under review by our admin team.",
      user: safeUser,
      token,
    });
    setSessionCookie(res, token);
    return res;
  } catch (error: any) {
    console.error("Register API error:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
