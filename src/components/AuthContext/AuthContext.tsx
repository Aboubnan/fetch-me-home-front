import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'admin' | 'benevole' | 'association' | null;
  userData: {
    id: number;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
  } | null;
  login: (token: string, role: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem('token'),
  );

  const [userData, setUserData] = useState(() => {
    try {
      const storedData = sessionStorage.getItem('userData');
      return storedData && storedData !== 'undefined'
        ? JSON.parse(storedData)
        : null;
    } catch (error) {
      console.error('Error parsing userData:', error);
      return null;
    }
  });
  console.log(userData);

  const [userRole, setUserRole] = useState(
    sessionStorage.getItem('userRole') as AuthContextType['userRole'],
  );

  const login = (token: string, role: string, userData: any) => {
    try {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userRole', role);
      sessionStorage.setItem('userData', JSON.stringify(userData || null));
      setIsAuthenticated(true);
      setUserRole(role as AuthContextType['userRole']);
      setUserData(userData);
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('userData');
      setIsAuthenticated(false);
      setUserRole(null);
      setUserData(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Déconnexion à la fermeture de la fenêtre ou de l’onglet
  useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, userData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
