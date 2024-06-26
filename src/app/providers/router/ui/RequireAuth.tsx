import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  let isAuth = useSelector(getUserAuthData);
  let location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    // If roles is undefined, consider the user has role
    if (!roles) {
      return true;
    }

    // Check if the user has at least one of the required roles
    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);

      // Return true if the user has the required role, false otherwise
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!isAuth) {
    // redirect to main page if authOnly Page
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    );
  }

  return children;
}
