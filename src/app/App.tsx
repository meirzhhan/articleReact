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

const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const initiated = useSelector(getUserInitiated);

  // getting info about user(logged or not)
  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!initiated) return <PageLoader />;

  return (
    <div className={classNames('app', { selected: false }, [theme])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <Sidebar />
          {initiated && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
