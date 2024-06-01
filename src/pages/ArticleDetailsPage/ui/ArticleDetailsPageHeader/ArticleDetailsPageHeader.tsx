import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import cl from './ArticleDetailsPageHeader.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';

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
      navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
      <div className={classNames(cl.ArticleDetailsPageHeader, {}, [className])}>
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t('Все статьи')}
        </Button>
        {canEdit && (
          <Button
            className={cl.editBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onEditArticle}
          >
            {t('Редактировать')}
          </Button>
        )}
      </div>
    );
  },
);
