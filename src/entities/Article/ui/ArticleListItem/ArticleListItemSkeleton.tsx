import { memo } from 'react';

import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useClassName } from '@/shared/lib/hooks/useClassName';

import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleSkeletonBig } from '../ArticleInfo/ArticleSkeleton';
import cl from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

/**
 * Компонент ArticleListItemSkeleton, отображающий скелетон для двух вариантов (BIG, SMALL).
 *
 * @param {ArticleListItemSkeletonProps}  props - Свойства компонента.
 * @returns {JSX.Element} Компонент.
 */

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { view } = props;

    if (view === ArticleView.BIG) {
      return (
        <Card border="partial" padding="24" className={cl.card}>
          {ArticleSkeletonBig}
        </Card>
      );
    }

    return (
      <div className={useClassName('', {}, [cl[view]])}>
        <Skeleton border="20px" className={cl.card}></Skeleton>
      </div>
    );
  },
);
