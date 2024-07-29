import ReactDOM from 'react-dom/client';

import { StoreProvider } from '@/app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

import App from './app/App';

import '@/shared/config/i18n/i18n';

import './app/styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>,
);
