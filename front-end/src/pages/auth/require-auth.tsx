import { Progress } from '@chakra-ui/react';
import useAuth from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { loading, userState } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Progress size="xs" isIndeterminate />;
  }

  if (!userState.isAuthenticated) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return children;
}
