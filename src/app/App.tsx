import { classNames } from '@/shared/lib/classNames/classNames';

import { AppRouter } from './providers/router';
import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { getUserInitiated, initAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const initiated = useSelector(getUserInitiated);
  const toolbar = useAppToolbar();

  // getting info about user(logged or not)
  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!initiated)
    return (
      <div id="app" className={classNames('App', { selected: false }, [theme])}>
        <AppLoaderLayout />
      </div>
    );

  return (
    <div id="app" className={classNames('App', { selected: false }, [theme])}>
      <Suspense fallback="">
        <MainLayout
          header={<Header />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
          toolbar={toolbar}
        />
      </Suspense>
    </div>
  );
};

export default App;
