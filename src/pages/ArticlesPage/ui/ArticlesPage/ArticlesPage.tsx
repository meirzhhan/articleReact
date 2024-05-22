import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ArticlesPage.module.scss';
import { memo } from 'react';

interface ArticlePageProps {
  className?: string;
}

const ArticlePage = ({ className }: ArticlePageProps) => {
  const { t } = useTranslation('article-details');
  return (
    <div className={classNames(cl.ArticlePage, {}, [className])}>
      {t('Страница статьи')}
    </div>
  );
};

export default memo(ArticlePage);
