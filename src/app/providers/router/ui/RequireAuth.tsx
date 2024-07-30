import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const isAuth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  // необходимые роли у пользователя
  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    // Проверка на необходимые роли (admin || manager)
    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  // Если пользователь не авторизован, перенаправление на главную страницу
  if (!isAuth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  // Если у пользователя нет необходимых ролей, перенаправление его на страницу с ошибкой доступа
  if (!hasRequiredRoles) {
    return (
      <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    );
  }

  return children;
}
