import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/consts/articleConsts';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    const Card = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => CardRedesigned,
      off: () => CardDeprecated,
    });

    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
        >
          <Card className={cl.card}>
            <div className={cl.header}>
              <Skeleton border="50%" height={30} width={30} />
              <Skeleton width={150} height={16} className={cl.username} />
              <Skeleton width={150} height={16} className={cl.date} />
            </div>
            <Skeleton width={250} height={24} className={cl.title} />
            <Skeleton height={200} className={cl.img} />
            <div className={cl.footer}>
              <Skeleton height={36} width={200} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div
        className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
      >
        <Card className={cl.card}>
          <div className={cl.imageWrapper}>
            <Skeleton width={200} height={200} className={cl.img} />
          </div>

          <div className={cl.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>

          <Skeleton width={150} height={16} className={cl.title} />
        </Card>
      </div>
    );
  },
);
