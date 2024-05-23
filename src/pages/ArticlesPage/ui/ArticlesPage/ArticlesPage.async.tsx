import { lazy } from 'react';

// export const ArticlesPageAsync = lazy(() => import('./ArticlesPage'));

export const ArticlesPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        resolve(import('./ArticlesPage'));
      }, 400);
    }),
);
