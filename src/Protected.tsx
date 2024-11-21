import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Context/useAuth';
import { toast } from 'react-toastify';

type Props = { children: React.ReactNode };

const Protected = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Protected
