import React from 'react';
import { useTranslation } from 'react-i18next';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import cl from './NotFoundPage.module.scss';
import { Page } from '@/widgets/Page';

interface NotFoundPageProps {
  className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();
  return (
    <Page
      data-testid="NotFoundPage"
      className={useClassName(cl.NotFoundPage, {}, [className])}
    >
      {t('Страница не найдена')}
    </Page>
  );
};

export default NotFoundPage;
