import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';

import { ArticleListItemSkeleton } from '../Skeletons/Skeletons';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

/**
 * Функция для получения массива скелетонов в зависимости от вида отображения.
 *
 * @param {ArticleView} view - Вид отображения статей.
 * @returns {JSX.Element[]} Массив компонентов скелетонов.
 */

const getSkeletons = (view: ArticleView): JSX.Element[] =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => <ArticleListItemSkeleton key={index} view={view} />);

/**
 * Компонент для отображения списка статей.
 *
 * @param {ArticleListProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент.
 */

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target,
  } = props;
  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return <Text size="l" title={t('Статьи не найдены')} />;
  }

  return (
    <HStack
      className={className}
      wrap="wrap"
      gap="16"
      data-testid="ArticleList"
    >
      {articles.map((item) => (
        <ArticleListItem
          article={item}
          view={view}
          target={target}
          key={item.id}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </HStack>
  );
});
