
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  nid?: string;
  phone?: string;
  address?: string;
  joinDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Demo users for testing
  const demoUsers = [
    {
      id: '1',
      name: 'আহমেদ রহমান',
      email: 'admin@bondhu.com',
      role: 'admin' as const,
      nid: '1234567890',
      phone: '+8801712345678',
      address: 'ঢাকা, বাংলাদেশ',
      joinDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'ফাতিমা খাতুন',
      email: 'member@bondhu.com',
      role: 'member' as const,
      nid: '9876543210',
      phone: '+8801987654321',
      address: 'চট্টগ্রাম, বাংলাদেশ',
      joinDate: '2024-02-01'
    }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('bondhu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('bondhu_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bondhu_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};
