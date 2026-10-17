"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SalonBusinessType } from "@/types/user";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Account Info
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    // Step 2: Salon & Location Info
    salonName: "",
    businessType: "Hair Salon" as SalonBusinessType,
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    gstNumber: "",
    licenseNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.phone.trim()) {
      setError("Please fill out all credentials.");
      return;
    }
    if (formData.password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.salonName.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      setError("Please enter your salon brand name, address, city, and pincode.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
      salonName: formData.salonName,
      businessType: formData.businessType,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      gstNumber: formData.gstNumber,
      licenseNumber: formData.licenseNumber,
    });

    setLoading(false);

    if (!res.success) {
      setError(res.error || "Failed to register. Please check your details.");
      return;
    }

    setStep(3); // Success / Pending Screen
  };

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "85vh", padding: "3rem 1rem" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {/* Header Notice */}
        <div style={{ backgroundColor: "#111111", color: "#ffffff", padding: "1.75rem 2rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(245, 158, 11, 0.2)", color: "#f59e0b", padding: "4px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
            <ShieldCheck size={14} /> Licensed Trade Only
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em", margin: 0 }}>
            Apply For Salon Wholesale Account
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.4rem" }}>
            Access exclusive 40-50% wholesale distributor pricing upon trade verification.
          </p>

          {/* Stepper Indicator */}
          {step < 3 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginTop: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: step === 1 ? "#f59e0b" : "#10b981", color: step === 1 ? "#000000" : "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800 }}>
                  1
                </span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: step === 1 ? "#ffffff" : "#a1a1aa" }}>Login ID</span>
              </div>
              <div style={{ width: "40px", height: "1px", backgroundColor: "#333333" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: step === 2 ? "#f59e0b" : "#333333", color: step === 2 ? "#000000" : "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800 }}>
                  2
                </span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: step === 2 ? "#ffffff" : "#666666" }}>Salon & Location</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div style={{ margin: "1.5rem 2rem 0 2rem", padding: "0.75rem 1rem", backgroundColor: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "8px", color: "#b91c1c", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* STEP 1: LOGIN CREDENTIALS */}
        {step === 1 && (
          <form onSubmit={handleNextStep1} style={{ padding: "2rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.25rem", color: "#111111" }}>
              Step 1: Your Account Credentials
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sameer Kapoor"
                  required
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                  Professional Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@yoursalon.com"
                  required
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                  Mobile Number (For Dispatch & OTP) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 5 characters"
                    required
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    required
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-pill-black"
              style={{ width: "100%", marginTop: "1.75rem", padding: "0.85rem", fontSize: "14px" }}
            >
              Continue to Salon Verification <ArrowRight size={16} />
            </button>

            <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "13px", color: "#6b7280" }}>
              Already registered?{" "}
              <Link href="/login" style={{ fontWeight: 800, color: "#111111", textDecoration: "underline" }}>
                Log in here
              </Link>
            </div>
          </form>
        )}

        {/* STEP 2: SALON BRAND & LOCATION DETAILS */}
        {step === 2 && (
          <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 700 }}
              >
                <ArrowLeft size={14} /> Back to Step 1
              </button>
            </div>

            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.3rem", color: "#111111" }}>
              Step 2: Salon Brand & Location
            </h2>
            <p style={{ fontSize: "12.5px", color: "#6b7280", marginBottom: "1.25rem" }}>
              Our administration verifies this information before unlocking trade wholesale privileges.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                  Salon / Studio / Brand Name *
                </label>
                <input
                  type="text"
                  name="salonName"
                  value={formData.salonName}
                  onChange={handleChange}
                  placeholder="e.g. Elegance Hair Lounge"
                  required
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                  Business Category *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px", backgroundColor: "#ffffff" }}
                >
                  <option value="Hair Salon">Hair Salon / Studio</option>
                  <option value="Beauty Parlour">Beauty Parlour & Skin Care</option>
                  <option value="Nail Studio">Nail Studio & Lash Bar</option>
                  <option value="Aesthetic Clinic / Spa">Aesthetic Clinic / Day Spa</option>
                  <option value="Freelance Stylist">Freelance / Independent Stylist</option>
                  <option value="Cosmetology Academy">Cosmetology Academy / School</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                  Salon Physical Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Shop No., Street Name, Landmark"
                  required
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    required
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 400050"
                    required
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                    GSTIN Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="27AAAAA0000A1Z5"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                    Trade License / Reg. No.
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="Shop Act / Cosmetology ID"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-pill-black"
              style={{ width: "100%", marginTop: "1.75rem", padding: "0.85rem", fontSize: "14px" }}
            >
              {loading ? "Submitting Application..." : "Submit For Admin Approval"}
            </button>
          </form>
        )}

        {/* STEP 3: APPLICATION SUBMITTED / PENDING REVIEW */}
        {step === 3 && (
          <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#fef3c7",
                color: "#d97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
              }}
            >
              <CheckCircle size={36} color="#d97706" />
            </div>

            <span
              style={{
                backgroundColor: "#fef3c7",
                color: "#92400e",
                padding: "4px 12px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              STATUS: PENDING ADMIN APPROVAL
            </span>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, marginTop: "1rem", color: "#111111" }}>
              Trade Account Under Review
            </h2>

            <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.6, maxWidth: "460px", margin: "1rem auto 2rem auto" }}>
              Thank you, <strong>{formData.name}</strong>! Your application for{" "}
              <strong>{formData.salonName}</strong> ({formData.city}) has been received. To ensure wholesale manufacturer pricing remains exclusively for licensed professionals, our administration reviews each application before granting purchasing access.
            </p>

            <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem", textAlign: "left", maxWidth: "460px", margin: "0 auto 2rem auto", fontSize: "13px" }}>
              <div style={{ fontWeight: 800, textTransform: "uppercase", color: "#111111", marginBottom: "8px" }}>
                What happens next?
              </div>
              <ul style={{ paddingLeft: "1.2rem", margin: 0, color: "#4b5563", lineHeight: 1.6 }}>
                <li>Admin verification usually takes <strong>2 to 4 business hours</strong>.</li>
                <li>Once approved, your ID will unlock wholesale trade discounts across all 4,200+ salon products.</li>
                <li>You can log in anytime to check your real-time approval status.</li>
              </ul>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => router.push("/shop")}
                className="btn-pill-white"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Browse Catalog Preview
              </button>
              <button
                onClick={() => router.push("/login")}
                className="btn-pill-black"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Log In To Check Status
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
