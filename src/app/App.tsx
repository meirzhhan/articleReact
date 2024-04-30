import './styles/index.scss';

import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemProvider';

import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';

const App = () => {
  const { theme } = useTheme();
  const s = [1, 2];

  return (
    <div className={classNames('app', { selected: false }, [theme])}>
      <Suspense fallback="">
        {s.map((s) => (
          <div></div>
        ))}
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
