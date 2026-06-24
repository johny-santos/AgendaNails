import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
    id: number;
    nome: string;
    email: string;
    token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;

  login: (userData: User) => Promise<void>;
  
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

const [user, setUser] = useState<User | null>(null);
  const login = async (userData: User) => {

    setIsAuthenticated(true);

    setUser(userData);

  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  }; 

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
