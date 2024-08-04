import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { Text } from '@/shared/ui/Text';

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid="ForbiddenPage">
      <Text title={t('Нет прав доступа для этой страницы')} bold />
    </Page>
  );
};

export default ForbiddenPage;
