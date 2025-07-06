import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './components/AuthContext/AuthContext';

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'benevole' | 'association';
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'association' && userRole === 'association') {
    return <Outlet />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
