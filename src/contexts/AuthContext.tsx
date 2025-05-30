'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const login = (email: string, password: string) => {
    // Login fake para demonstração
    const user = { name: 'Usuário Demo', email };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    Cookies.remove('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 