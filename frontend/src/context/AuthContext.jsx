import React, { createContext, useCallback, useContext, useState } from "react";
import { CURRENT_STUDENT } from "@/data/mockStudents";
import { CURRENT_COMPANY } from "@/data/mockCompanies";

const AuthContext = createContext(null);
const ACCOUNTS_KEY = "kv_registered_accounts";

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

const readAccounts = () => {
  try {
    const saved = localStorage.getItem(ACCOUNTS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const writeAccounts = (accounts) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
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

  const setSession = useCallback((profile) => {
    setUser(profile);
    localStorage.setItem("kv_user", JSON.stringify(profile));
    return profile;
  }, []);

  const login = useCallback((role) => {
    let profile;
    if (role === "student") profile = { role, ...CURRENT_STUDENT, isDemo: true };
    else if (role === "company") profile = { role, ...CURRENT_COMPANY, isDemo: true };
    else if (role === "faculty") profile = { role, ...FACULTY_PROFILE, isDemo: true };
    else profile = { role: "admin", ...ADMIN_PROFILE, isDemo: true };
    return setSession(profile);
  }, [setSession]);

  const registerAccount = useCallback((data) => {
    const accounts = readAccounts();
    const normalizedEmail = data.email.trim().toLowerCase();

    if (accounts.some((account) => account.email === normalizedEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const account = {
      id: `stu-${Date.now()}`,
      role: data.accountType,
      isDemo: false,
      name: data.fullName.trim(),
      email: normalizedEmail,
      password: data.password,
      college: data.college?.trim() || "",
      degree: data.degree || "",
      branch: data.branch?.trim() || "",
      currentYear: data.currentYear || "",
      semester: data.semester || "",
      graduationYear: data.graduationYear || "",
      cgpa: data.cgpa || "",
      location: "",
      about: "",
      profileCompletion: data.accountType === "student" ? 45 : 20,
      readinessScore: 0,
      skillScore: 0,
      skills: [],
    };

    accounts.push(account);
    writeAccounts(accounts);
    return account;
  }, []);

  const loginWithCredentials = useCallback((email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = readAccounts().find(
      (item) => item.email === normalizedEmail && item.password === password
    );

    if (!account) {
      throw new Error("Invalid email or password.");
    }

    const { password: _password, ...safeProfile } = account;
    return setSession(safeProfile);
  }, [setSession]);


  const resetPassword = useCallback((email, newPassword) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readAccounts();
    const index = accounts.findIndex((account) => account.email === normalizedEmail);
    if (index === -1) throw new Error("No registered account found for this email.");
    accounts[index] = { ...accounts[index], password: newPassword };
    writeAccounts(accounts);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, ...updates };
      localStorage.setItem("kv_user", JSON.stringify(next));

      if (!next.isDemo && next.email) {
        const accounts = readAccounts();
        const updatedAccounts = accounts.map((account) =>
          account.email === next.email ? { ...account, ...updates } : account
        );
        writeAccounts(updatedAccounts);
      }

      return next;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("kv_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithCredentials,
        registerAccount,
        resetPassword,
        updateUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
