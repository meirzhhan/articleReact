import './styles/index.scss';

import { Link } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemProvider';

import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', { selected: false }, [theme])}>
      <Navbar />
      <AppRouter></AppRouter>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

export default App;
