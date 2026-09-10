import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockStudents } from '../data/mockStudents';

const AuthContext = createContext();

export const demoProfiles = {
  student: {
    role: 'student',
    name: 'Aarav Sharma',
    avatar: 'AS',
    email: 'aarav.sharma@ves.ac.in',
    college: "Vivekanand Education Society's College (VESASC)",
    branch: 'Information Technology',
    graduationYear: 2026,
    cgpa: 8.84,
    headline: 'Aspiring Full Stack Engineer | SIH Contributor',
  },
  company: {
    role: 'company',
    name: 'Rajesh Iyer',
    avatar: 'RI',
    email: 'rajesh.iyer@razorpay.com',
    companyName: 'Razorpay',
    companyInitials: 'RZ',
    title: 'Lead Campus Talent Acquisition Partner',
    industry: 'FinTech / Payments Infrastructure',
    activeListings: 4,
  },
  admin: {
    role: 'admin',
    name: 'Dr. Pradeep Sengupta',
    avatar: 'PS',
    email: 'placement.director@ves.ac.in',
    institution: 'VESASC / Directorate of Technical Education',
    designation: 'Dean of Career Development & Placement Affairs',
    roleLabel: 'Institutional Admin & SIH Nodal Officer',
  }
};

export const AuthProvider = ({ children }) => {
  // Check localStorage or default to student for quick demo evaluation
  const [currentUser, setCurrentUser] = useState(() => {
    const savedRole = localStorage.getItem('kv_demo_role');
    if (savedRole && demoProfiles[savedRole]) {
      return demoProfiles[savedRole];
    }
    return demoProfiles.student;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const loginAs = (role) => {
    if (demoProfiles[role]) {
      setCurrentUser(demoProfiles[role]);
      setIsAuthenticated(true);
      localStorage.setItem('kv_demo_role', role);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('kv_demo_role');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || 'guest',
        isAuthenticated,
        loginAs,
        logout,
        demoProfiles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
