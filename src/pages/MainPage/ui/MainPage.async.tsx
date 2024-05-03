import { lazy } from 'react';

// export const MainPageAsync = lazy(() => import('./MainPage'));

export const MainPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        resolve(import('./MainPage'));
      }, 1500);
    }),
);
