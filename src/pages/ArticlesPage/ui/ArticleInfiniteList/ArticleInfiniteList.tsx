import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';

import { Text } from '@/shared/ui/Text';

import { getArticles } from '../../model/slices/articlesPageSlice';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

interface ArticleInfiniteListProps {
  className?: string;
}

/**
 * Компонент `ArticleInfiniteList` отображает список статей с бесконечной прокруткой.
 * Использует данные из Redux-состояния для отображения статей, состояния загрузки и ошибок.
 *
 * @param {ArticleInfiniteListProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент списка статей с бесконечной прокруткой.
 */

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const { t } = useTranslation();

  // Данные из Redux
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  if (error) {
    return <Text title={t('Ошибка при загрузке статей')} />;
  }

  return (
    <ArticleList
      className={className}
      isLoading={isLoading}
      view={view}
      articles={articles}
    />
  );
});
