import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ArticlesPage.module.scss';
import { memo } from 'react';

interface ArticlePageProps {
  className?: string;
}

const ArticlePage = ({ className }: ArticlePageProps) => {
  const { t } = useTranslation('article');
  return (
    <div className={classNames(cl.ArticlePage, {}, [className])}>
      Articles Page
    </div>
  );
};

export default memo(ArticlePage);
