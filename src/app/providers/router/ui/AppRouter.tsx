import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps } from '@/shared/types/router';

import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';

// Основной компонент маршрутизации, который рендерит маршруты с оберткой
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
