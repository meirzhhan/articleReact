import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps } from '@/shared/types/router';

import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';

/**
 * Основной компонент маршрутизации приложения.
 *
 * Этот компонент оборачивает маршруты в компонент `Suspense` для поддержки ленивой загрузки и
 * проверяет необходимость аутентификации с помощью `RequireAuth`.
 * @returns {JSX.Element} - Рендерит маршруты с оберткой, используя конфигурацию маршрутов.
 */
const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <Suspense fallback={<></>}>{route.element}</Suspense>;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          // Если аутентификация нет, перенаправляет на '/'
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
