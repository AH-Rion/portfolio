import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  login: (emailOrPassword: string, maybePassword?: string) => Promise<boolean> | boolean;
  logout: () => void;
  toggleEditMode: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean> | boolean;
  resetPassword: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isEditMode: false,
  login: () => false,
  logout: () => {},
  toggleEditMode: () => {},
  changePassword: () => false,
  resetPassword: () => {},
});

export const useAdmin = () => useContext(AdminContext);

async function checkAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return false;
  return !!data;
}

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
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

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) checkAdmin(s.user.id).then(setIsAdmin);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Accept (email, password) OR (password) for backward compatibility.
  const login = async (emailOrPassword: string, maybePassword?: string) => {
    const email = maybePassword !== undefined ? emailOrPassword : "";
    const password = maybePassword !== undefined ? maybePassword : emailOrPassword;
    if (!email || !password) return false;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return false;
    const admin = await checkAdmin(data.user.id);
    if (!admin) {
      await supabase.auth.signOut();
      return false;
    }
    setIsAdmin(true);
    return true;
  };

  const logout = () => {
    supabase.auth.signOut();
    setIsAdmin(false);
    setIsEditMode(false);
  };

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const changePassword = async (_current: string, next: string) => {
    if (!next || next.length < 6) return false;
    const { error } = await supabase.auth.updateUser({ password: next });
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
