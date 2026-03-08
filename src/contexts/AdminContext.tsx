import { createContext, useContext, useState, ReactNode } from "react";

const ADMIN_PASSWORD = "admin123"; // Change this to your desired password

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  toggleEditMode: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isEditMode: false,
  login: () => false,
  logout: () => {},
  toggleEditMode: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("portfolio-admin") === "true";
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
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

  return (
    <AdminContext.Provider value={{ isAdmin, isEditMode, login, logout, toggleEditMode }}>
      {children}
    </AdminContext.Provider>
  );
};
