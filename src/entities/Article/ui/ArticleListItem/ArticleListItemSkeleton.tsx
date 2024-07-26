import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { ArticleView } from '../../model/consts/articleConsts';
import cl from './ArticleListItem.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const mainClass = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => cl.ArticleListItemRedesigned,
      off: () => cl.ArticleListItem,
    });

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

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
        <div className={classNames(mainClass, {}, [className, cl[view]])}>
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <CardRedesigned border="round" className={cl.card}>
                {cardContent}
              </CardRedesigned>
            }
            off={
              <CardDeprecated className={cl.card}>{cardContent}</CardDeprecated>
            }
          />
        </div>
      );
    }

    const cardContent = (
      <>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Skeleton
              width="100%"
              height={150}
              border="32px"
              className={cl.img}
            />
          }
          off={
            <div className={cl.imageWrapper}>
              <Skeleton width={200} height={200} className={cl.img} />
            </div>
          }
        />
        <div className={cl.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={cl.title} />
      </>
    );

    return (
      <div className={classNames(mainClass, {}, [className, cl[view]])}>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <CardRedesigned border="round" className={cl.card}>
              {cardContent}
            </CardRedesigned>
          }
          off={
            <CardDeprecated className={cl.card}>{cardContent}</CardDeprecated>
          }
        />
      </div>
    );
  },
);
