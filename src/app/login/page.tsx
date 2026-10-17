"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Clock, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPendingMessage(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (!res.success) {
      setError(res.error || "Login failed");
      return;
    }

    if (res.status === "pending") {
      setPendingMessage(
        "Your salon trade account application is currently PENDING review by our administration. Once our team approves your brand and location details, you will have complete purchasing access."
      );
      return;
    }

    if (res.status === "rejected") {
      setError(
        "Your trade account application could not be verified by administration. Please contact support@beupros.com or submit a new trade application with valid salon registration."
      );
      return;
    }

    // Approved or Admin
    if (email.toLowerCase().includes("admin")) {
      router.push("/admin");
    } else {
      router.push("/shop");
    }
  };

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "80vh", padding: "3.5rem 1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <div style={{ backgroundColor: "#111111", color: "#ffffff", padding: "2rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(245, 158, 11, 0.2)", color: "#f59e0b", padding: "4px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            <Lock size={13} /> Trade Portal Login
          </div>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 900, textTransform: "uppercase", margin: 0 }}>
            Sign In to Beupros
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#a1a1aa", marginTop: "0.3rem" }}>
            Wholesale access for verified salon owners & stylists
          </p>
        </div>

        <div style={{ padding: "2rem" }}>
          {error && (
            <div style={{ marginBottom: "1.25rem", padding: "0.85rem 1rem", backgroundColor: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "8px", color: "#b91c1c", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          {pendingMessage && (
            <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: "10px", color: "#92400e", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>
                <Clock size={16} color="#d97706" /> Application Under Review
              </div>
              <div style={{ lineHeight: 1.5 }}>{pendingMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="salon@business.com"
                required
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#4b5563" }}>
                  Password
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "14px" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-pill-black"
              style={{ width: "100%", marginTop: "0.5rem", padding: "0.85rem", fontSize: "14px" }}
            >
              {loading ? "Authenticating..." : "Sign In To Trade Portal"}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div style={{ marginTop: "1.75rem", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "0.85rem 1rem", fontSize: "12px", color: "#6b7280" }}>
            <div style={{ fontWeight: 800, textTransform: "uppercase", color: "#111111", marginBottom: "4px" }}>
              Demo Accounts:
            </div>
            <div>• <strong>Approved Salon:</strong> contact@envisalon.com (pwd: salon)</div>
            <div>• <strong>Pending Salon:</strong> rahul@glamlocks.in (pwd: salon)</div>
            <div>• <strong>Admin Dashboard:</strong> admin@beupros.com (pwd: admin)</div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "13px", color: "#6b7280" }}>
            New salon or freelance stylist?{" "}
            <Link href="/register" style={{ fontWeight: 800, color: "#111111", textDecoration: "underline" }}>
              Apply for a trade account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
