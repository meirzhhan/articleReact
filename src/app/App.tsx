import { classNames } from '@/shared/lib/classNames/classNames';

import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { getUserInitiated, initAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const initiated = useSelector(getUserInitiated);

  // getting info about user(logged or not)
  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!initiated)
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div
            id="app"
            className={classNames('app_redesigned', { selected: false }, [
              theme,
            ])}
          >
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div
          id="app"
          className={classNames('app', { selected: false }, [theme])}
        >
          <Suspense fallback="">
            <Navbar />

            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
      on={
        <div
          id="app"
          className={classNames('app_redesigned', { selected: false }, [theme])}
        >
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={<div></div>}
            />
          </Suspense>
        </div>
      }
    />
  );
};

export default App;
