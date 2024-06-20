import { classNames } from '@/shared/lib/classNames/classNames';

import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInitiated, userActions } from '@/entities/User';
import { useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const initiated = useSelector(getUserInitiated);

  // getting info about user(logged or not)
  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

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
