import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';

import { getRouteForbidden, getRouteMain } from '@/shared/consts/router';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

/**
 * Компонент `RequireAuth` отвечает за проверку аутентификации и авторизации пользователя.
 *
 * @param {JSX.Element} children - Компонент, который будет отображаться, если условия выполнены.
 * @param {UserRole[]} [roles] - Список ролей, которые необходимы для доступа к дочернему компоненту.
 *
 * @returns {JSX.Element} - Возвращает дочерний компонент, если пользователь авторизован и имеет необходимые роли,
 * или перенаправляет на соответствующую страницу.
 */

export function RequireAuth({
  children,
  roles,
}: RequireAuthProps): JSX.Element {
  const isAuth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  /**
   * Проверка наличия у пользователя необходимых ролей.
   * @returns {boolean} - Возвращает `true`, если у пользователя есть хотя бы одна из требуемых ролей, иначе `false`.
   */
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
