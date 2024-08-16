import { memo } from 'react';

import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

import { ArticleView } from '../../model/consts/articleConsts';

interface ArticleListItemSkeletonProps {
  view: ArticleView;
}

/**
 * Скелетон для информации о статье.
 *
 * @component
 * @returns {JSX.Element} Скелетон для информации о статье.
 */

export const ArticleInfoSkeleton = (): JSX.Element => {
  return (
    <>
      <Skeleton width={500} height={40} border={'12px'} />
      <Skeleton width={600} height={32} border={'12px'} />
      <Skeleton width={885} height={420} border="12px" />
      <Skeleton width={885} height={96} border="12px" />
      <Skeleton width={885} height={150} border="12px" />
      <Skeleton width={885} height={250} border="12px" />
    </>
  );
};

/**
 * Скелетон для списка статей. BIG | SMALL
 *
 * @component
 * @param {ArticleListItemSkeletonProps} props - Пропсы для компонента.
 * @returns {JSX.Element} Скелетон для элемента списка статей.
 */

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { view } = props;

    if (view === ArticleView.BIG) {
      return (
        <Card padding="24" border="partial" maxWidth flexColumn gap="8">
          <HStack gap="8">
            <Skeleton width={32} height={32} border="50%" />
            <Skeleton width={180} height={24} border="20px" />
          </HStack>

          <Skeleton height={32} width={150} border="20px" />
          <Skeleton height={24} width={450} border="20px" />
          <Skeleton height={420} border="20px" />
          <Skeleton height={72} border="20px" />
          <Skeleton height={40} width={135} border="20px" />
        </Card>
      );
    }
    return <Skeleton width={250} height={350} border="20px" />;
  },
);
