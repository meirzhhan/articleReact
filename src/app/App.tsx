import './styles/index.scss';

import { Link } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemProvider';

import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', { selected: false }, [theme])}>
      <Navbar />
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
