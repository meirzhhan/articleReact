import { lazy, FC } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

// export const ArticlesPageAsync = lazy(() => import('./ArticlesPage'));

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        resolve(import('./AddCommentForm'));
      }, 1500);
    }),
);
