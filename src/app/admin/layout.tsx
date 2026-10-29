"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, login, logout, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (loading) return null;
  if (isAdmin) return <>{children}</>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const r = await login(email.trim(), password);
    setBusy(false);
    if (!r.success) setError(r.error || "Login failed");
  };

  const input: React.CSSProperties = {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #334155",
    background: "#1e293b", color: "#fff", fontSize: 14, boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0 }}>Beupros Admin</h1>
        {user && !isAdmin && (
          <p style={{ color: "#fbbf24", fontSize: 13, margin: 0 }}>
            {user.email} does not have admin access.{" "}
            <button type="button" onClick={logout} style={{ background: "none", border: 0, color: "#93c5fd", cursor: "pointer", padding: 0 }}>
              Sign out
            </button>
          </p>
        )}
        <input style={input} type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input style={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p style={{ color: "#f87171", fontSize: 13, margin: 0 }}>{error}</p>}
        <button type="submit" disabled={busy} style={{ padding: 12, borderRadius: 10, border: 0, background: "#fff", color: "#0f172a", fontWeight: 800, cursor: "pointer" }}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
