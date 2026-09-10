import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback((role, email) => {
    const profiles = {
      student: {
        id: 's1',
        name: 'Rahul Sharma',
        email: email || 'rahul.sharma@example.com',
        role: 'student',
        college: 'IIT Bombay',
        degree: 'B.Tech Computer Science',
        branch: 'Computer Science',
        graduationYear: 2025,
        cgpa: 8.7,
        location: 'Mumbai, Maharashtra',
        avatar: null,
        profileCompletion: 85,
        placementReadiness: 78,
        skillScore: 82,
      },
      company: {
        id: 'c1',
        name: 'TechVista Solutions',
        email: email || 'careers@techvista.example.com',
        role: 'company',
        industry: 'IT Services',
        location: 'Bengaluru, Karnataka',
        size: '500-1000',
        profileCompletion: 88,
      },
      admin: {
        id: 'admin1',
        name: 'Dr. Suresh Menon',
        email: email || 'admin@kaushalverse.example.com',
        role: 'admin',
        institution: 'IIT Bombay',
      },
    };
    setUser(profiles[role] || profiles.student);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
