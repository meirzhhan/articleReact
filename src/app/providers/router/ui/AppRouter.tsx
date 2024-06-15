import { Route, Routes } from 'react-router-dom';
import { Suspense, memo, useCallback } from 'react';

import { PageLoader } from '@/widgets/PageLoader';
import {
  AppRoutesProps,
  routeConfig,
} from '@/shared/config/routeConfig/routeConfig';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          // If page is authOnly, element renders with Require Auth which redirects to '/'
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
