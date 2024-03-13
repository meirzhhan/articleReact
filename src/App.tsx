import { Route, Routes } from 'react-router-dom';
import './index.scss';
import { Link } from 'react-router-dom';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { Suspense } from 'react';

const App = () => {
  return (
    <div className="app">
      <Link to="/">Главная</Link>
      <Link to="/about">О сайте</Link>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/about" element={<AboutPageAsync />} />
          <Route path="/" element={<MainPageAsync />} />
        </Routes>
      </Suspense>

      {/* <Counter /> */}
    </div>
  );
};

export default App;
