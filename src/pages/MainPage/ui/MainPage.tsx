import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { Text } from '@/shared/ui/Text';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page data-testid="MainPage">
      <Text title={t('Главная страница')} bold />
    </Page>
  );
};

export default MainPage;
