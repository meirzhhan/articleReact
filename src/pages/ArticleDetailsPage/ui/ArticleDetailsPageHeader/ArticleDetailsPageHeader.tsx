import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import { getCanEditArticle } from '../../model/selectors/article';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const navigate = useNavigate();

    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      if (article) navigate(getRouteArticleEdit(article.id));
    }, [article, navigate]);

    return (
      <HStack
        max
        justify={'between'}
        className={classNames('', {}, [className])}
      >
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t('Все статьи')}
        </Button>
        {canEdit && (
          <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
            {t('Редактировать')}
          </Button>
        )}
      </HStack>
    );
  },
);
