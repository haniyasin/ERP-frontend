import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkTokenExpiration } from '../utils/checkTokenExpiration';
import { getUserRoleFromToken } from '../utils/getDataFromToken';
import { useAuth } from '../hooks/contextHooks';
import { handleUnauthorized } from './ErrorHandler';
import { toast } from 'react-toastify';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { logout } = useAuth();

  const storedToken = localStorage.getItem('accessToken');

  if (!storedToken) return <Navigate to="/login" replace />;

  const isValidToken = checkTokenExpiration(storedToken);
  if (!isValidToken) {
    logout();
    toast.error("Your Login token has expired please log in again");
    return <Navigate to="/login" replace />;
  }
  
  const userRole = getUserRoleFromToken();

  if(!userRole || !allowedRoles.includes(`${userRole}`)) 
    return handleUnauthorized();

  return <>{children}</>;
};

export default RequireAuth;