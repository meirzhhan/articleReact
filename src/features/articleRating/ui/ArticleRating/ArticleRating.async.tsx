import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
  return (
    <Suspense fallback={<></>}>
      <ArticleRatingLazy {...props} />
    </Suspense>
  );
};
