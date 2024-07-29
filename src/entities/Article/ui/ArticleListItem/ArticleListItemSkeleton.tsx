import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ArticleView } from '../../model/consts/articleConsts';
import cl from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.BIG) {
      const cardContent = (
        <>
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
        </>
      );
      return (
        <div
          className={classNames(cl.ArticleListItemRedesigned, {}, [
            className,
            cl[view],
          ])}
        >
          <Card border="round" className={cl.card}>
            {cardContent}
          </Card>
        </div>
      );
    }

    const cardContent = (
      <>
        <Skeleton width="100%" height={150} border="32px" className={cl.img} />
        <div className={cl.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={cl.title} />
      </>
    );

    return (
      <div
        className={classNames(cl.ArticleListItemRedesigned, {}, [
          className,
          cl[view],
        ])}
      >
        <Card border="round" className={cl.card}>
          {cardContent}
        </Card>
      </div>
    );
  },
);
