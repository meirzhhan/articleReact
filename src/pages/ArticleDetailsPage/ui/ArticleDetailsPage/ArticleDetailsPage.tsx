import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ArticleDetailsPage.module.scss';
import { memo } from 'react';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article');
  return (
    <div className={classNames(cl.ArticleDetailsPage, {}, [className])}>
      Article details page
    </div>
  );
};

export default memo(ArticleDetailsPage);
