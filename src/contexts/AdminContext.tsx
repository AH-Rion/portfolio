import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type LoginResult = { ok: true } | { ok: false; error: string };

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  toggleEditMode: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  resetPassword: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isEditMode: false,
  login: async () => ({ ok: false, error: "not ready" }),
  logout: () => {},
  toggleEditMode: () => {},
  changePassword: async () => false,
  resetPassword: () => {},
});

export const useAdmin = () => useContext(AdminContext);

async function checkAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error) {
      console.error("[admin] role lookup failed", error);
      return false;
    }
    return !!data;
  } catch (e) {
    console.error("[admin] role lookup threw", e);
    return false;
  }
}

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user) {
        setTimeout(() => {
          checkAdmin(s.user.id).then(setIsAdmin);
        }, 0);
      } else {
        setIsAdmin(false);
        setIsEditMode(false);
      }
    });

    supabase.auth
      .getSession()
      .then(({ data: { session: s } }) => {
        setSession(s);
        if (s?.user) checkAdmin(s.user.id).then(setIsAdmin);
      })
      .catch((e) => console.error("[admin] getSession failed", e));

    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    if (!email || !password) return { ok: false, error: "Email and password required" };
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        return { ok: false, error: error?.message || "Invalid credentials" };
      }
      const admin = await checkAdmin(data.user.id);
      if (!admin) {
        await supabase.auth.signOut();
        return { ok: false, error: "This account does not have admin access" };
      }
      setIsAdmin(true);
      return { ok: true };
    } catch (e: any) {
      console.error("[admin] login threw", e);
      return { ok: false, error: e?.message || "Login failed" };
    }
  };

  const logout = () => {
    supabase.auth.signOut().catch((e) => console.error("[admin] signOut failed", e));
    setIsAdmin(false);
    setIsEditMode(false);
  };

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const changePassword = async (_current: string, next: string) => {
    if (!next || next.length < 6) return false;
    const { error } = await supabase.auth.updateUser({ password: next });
    if (error) console.error("[admin] password update failed", error);
    return !error;
  };

  const resetPassword = () => {};

  return (
    <AdminContext.Provider
      value={{ isAdmin, isEditMode, login, logout, toggleEditMode, changePassword, resetPassword }}
    >
      {children}
    </AdminContext.Provider>
  );
};
