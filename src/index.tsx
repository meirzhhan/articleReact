import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemProvider';

import 'shared/config/i18n/i18n';

import App from './app/App';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
