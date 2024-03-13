import { render } from 'react-dom';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';

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
