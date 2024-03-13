import ReactDOM from 'react-dom/client';

import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemProvider';
// import ThemeProvider from './app/providers/ThemProvider/ui/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);

// render(
//   <BrowserRouter>
//     <ThemeProvider>
//       <App />
//     </ThemeProvider>
//   </BrowserRouter>,
//   document.getElementById('root'),
// );
