import { AppRouteByPathPattern, AppRoutes } from '@/shared/consts/router';
import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

/**
 * Хук `useRouteChange` отслеживает изменения маршрута и возвращает текущий маршрут приложения.
 * @returns Текущий маршрут приложения в виде значения из перечисления `AppRoutes`.
 */

export function useRouteChange() {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

  useEffect(() => {
    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
      }
    });
  }, [location.pathname]);

  return appRoute;
}
