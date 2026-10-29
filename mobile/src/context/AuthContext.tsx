import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SalonUser } from "../types/user";
import { fetchMe, loginRequest, registerRequest, setAuthToken } from "../lib/api";

const KEY = "beupros_user_session";
const TOKEN_KEY = "beupros_auth_token";

interface Ctx {
  user: SalonUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: Partial<SalonUser> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isApproved: boolean;
}

const AuthContext = createContext<Ctx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SalonUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [stored, token] = await Promise.all([AsyncStorage.getItem(KEY), AsyncStorage.getItem(TOKEN_KEY)]);
        if (stored && token) {
          setAuthToken(token);
          setUser(JSON.parse(stored));
          // Refresh the user record and verify the token is still valid
          try {
            const me = await fetchMe();
            setUser(me.user);
            AsyncStorage.setItem(KEY, JSON.stringify(me.user));
          } catch (e: any) {
            if (/auth/i.test(e.message)) clear();
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = (u: SalonUser, token: string) => {
    setAuthToken(token);
    setUser(u);
    AsyncStorage.setItem(KEY, JSON.stringify(u));
    AsyncStorage.setItem(TOKEN_KEY, token);
  };

  const clear = () => {
    setAuthToken(null);
    setUser(null);
    AsyncStorage.multiRemove([KEY, TOKEN_KEY]);
  };

  const login: Ctx["login"] = async (email, password) => {
    try {
      const r = await loginRequest(email, password);
      persist(r.user, r.token);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  };

  const register: Ctx["register"] = async (data) => {
    try {
      const r = await registerRequest(data);
      persist(r.user, r.token);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  };

  const logout = clear;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isApproved: user?.status === "approved" }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
