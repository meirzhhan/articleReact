import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ArticleAside } from '@/widgets/ArticleAside';

import { getArticleDetailsData } from '@/entities/Article';

import { Card } from '@/shared/ui/Card';
import { getRouteArticleEdit } from '@/shared/consts/router';

/**
 * Компонент контейнера для боковой панели статьи.
 *
 * @returns {JSX.Element | null} Контейнер с боковой панелью статьи.
 */

export const ArticleAsideContainer = memo(() => {
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);

  // Обработчик нажатия на кнопку редактирования статьи.
  const onEditArticle = useCallback(() => {
    if (article) navigate(getRouteArticleEdit(article.id));
  }, [article, navigate]);

  if (!article) return null;

  return (
    <Card padding="24" border="round">
      <ArticleAside
        onEdit={onEditArticle}
        author={article.user}
        views={article.views}
      />
    </Card>
  );
});
