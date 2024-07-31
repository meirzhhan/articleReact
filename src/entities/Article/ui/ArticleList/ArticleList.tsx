import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';
import { useClassName } from '@/shared/lib/hooks/useClassName';

import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import cl from './ArticleList.module.scss';

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
    .map((_, index) => (
      <ArticleListItemSkeleton className={cl.card} key={index} view={view} />
    ));

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
    return (
      <div className={useClassName('', {}, [className, cl[view]])}>
        <Text size="l" title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <HStack wrap="wrap" gap="16" data-testid="ArticleList">
      {articles.map((item) => (
        <ArticleListItem
          article={item}
          view={view}
          target={target}
          key={item.id}
          className={cl.card}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </HStack>
  );
});
