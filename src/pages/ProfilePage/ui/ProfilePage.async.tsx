import { lazy } from 'react';

// export const MainPageAsync = lazy(() => import('./MainPage'));

export const ProfilePageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        resolve(import('./ProfilePage'));
      }, 1500);
    }),
);
