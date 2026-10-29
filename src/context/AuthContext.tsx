"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SalonUser } from "@/types/user";

interface AuthContextType {
  user: SalonUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; status?: string }>;
  register: (data: Partial<SalonUser> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SalonUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("beupros_user_session");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    // Validate the server session (httpOnly cookie) and refresh the user record
    fetch("/api/auth/me")
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          localStorage.setItem("beupros_user_session", JSON.stringify(data.user));
        } else {
          setUser(null);
          localStorage.removeItem("beupros_user_session");
        }
      })
      .catch(() => {
        // offline: keep cached user
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }

      setUser(data.user);
      localStorage.setItem("beupros_user_session", JSON.stringify(data.user));
      return { success: true, status: data.user.status };
    } catch {
      return { success: false, error: "Network error during login" };
    }
  };

  const register = async (data: Partial<SalonUser> & { password: string }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();

      if (!res.ok) {
        return { success: false, error: resData.error || "Registration failed" };
      }

      setUser(resData.user);
      localStorage.setItem("beupros_user_session", JSON.stringify(resData.user));
      return { success: true };
    } catch {
      return { success: false, error: "Network error during registration" };
    }
  };

  const logout = () => {
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    localStorage.removeItem("beupros_user_session");
  };

  const isApproved = user?.status === "approved";
  const isPending = user?.status === "pending";
  const isRejected = user?.status === "rejected";
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isApproved,
        isPending,
        isRejected,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
