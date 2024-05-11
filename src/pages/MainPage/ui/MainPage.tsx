import React from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entities/Counter';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <div>
      {t('Главная страница')} <BugButton />
      {/* <Counter /> */}
    </div>
  );
};

export default MainPage;
