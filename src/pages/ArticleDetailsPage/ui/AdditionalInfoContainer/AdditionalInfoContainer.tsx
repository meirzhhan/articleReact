import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { ArticleAside } from '@/widgets/ArticleAside';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cl from './AdditionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/consts/router';

export const AdditionalInfoContainer = memo(() => {
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);

  const onEditArticle = useCallback(() => {
    if (article) navigate(getRouteArticleEdit(article.id));
  }, [article, navigate]);

  if (!article) return null;

  return (
    <Card padding="24" border="partial" className={cl.card}>
      <ArticleAside
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});
