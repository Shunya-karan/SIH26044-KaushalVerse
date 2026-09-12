import React, { createContext, useContext, useState, useCallback } from "react";
import { CURRENT_STUDENT } from "@/data/mockStudents";
import { CURRENT_COMPANY } from "@/data/mockCompanies";

const AuthContext = createContext(null);

const FACULTY_PROFILE = {
  id: "faculty-001",
  name: "Dr. Neha Kulkarni",
  email: "faculty.demo@kaushalverse.in",
  institution: "KaushalVerse Demo Institute",
};

const ADMIN_PROFILE = {
  id: "admin-001",
  name: "Institution Admin",
  email: "admin.demo@kaushalverse.in",
  institution: "Directorate of Technical Education (Demo)",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("kv_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((role) => {
    let profile;
    if (role === "student") profile = { role, ...CURRENT_STUDENT };
    else if (role === "company") profile = { role, ...CURRENT_COMPANY };
    else if (role === "faculty") profile = { role, ...FACULTY_PROFILE };
    else profile = { role: "admin", ...ADMIN_PROFILE };
    setUser(profile);
    localStorage.setItem("kv_user", JSON.stringify(profile));
    return profile;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("kv_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
