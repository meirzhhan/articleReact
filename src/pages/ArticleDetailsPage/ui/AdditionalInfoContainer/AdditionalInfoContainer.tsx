import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cl from './AdditionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AdditionalInfoContainer = memo(() => {
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);

  const onEditArticle = useCallback(() => {
    if (article) navigate(getRouteArticleEdit(article.id));
  }, [article, navigate]);

  if (!article) return null;

  return (
    <Card padding="24" border="partial" className={cl.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});
