import { createContext, useContext, useState, ReactNode } from "react";

const DEFAULT_ADMIN_PASSWORD = "admin123";
const PASSWORD_KEY = "portfolio-admin-password";

const getStoredPassword = () =>
  localStorage.getItem(PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  toggleEditMode: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
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

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("portfolio-admin") === "true";
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const login = (password: string) => {
    if (password === getStoredPassword()) {
      setIsAdmin(true);
      sessionStorage.setItem("portfolio-admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
    sessionStorage.removeItem("portfolio-admin");
  };

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (currentPassword !== getStoredPassword()) return false;
    if (!newPassword || newPassword.length < 4) return false;
    localStorage.setItem(PASSWORD_KEY, newPassword);
    return true;
  };

  const resetPassword = () => {
    localStorage.removeItem(PASSWORD_KEY);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isEditMode,
        login,
        logout,
        toggleEditMode,
        changePassword,
        resetPassword,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
