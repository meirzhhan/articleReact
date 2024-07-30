import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserInitiated, initAuthData } from '@/entities/User';

import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';

import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { customCl } from '@/shared/lib/classNames/classNames';

import { AppRouter } from './providers/router';
import { useToolbar } from './lib/useToolbar';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const initiated = useSelector(getUserInitiated);
  const toolbar = useToolbar();

  // получение информации о пользователе (auth  или нет)
  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  // Skeleton
  if (!initiated)
    return (
      <div id="app" className={customCl('App', {}, [theme])}>
        <AppLoaderLayout />
      </div>
    );

  return (
    <div id="app" className={customCl('App', { selected: false }, [theme])}>
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
