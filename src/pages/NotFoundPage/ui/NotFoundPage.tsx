import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { Text } from '@/shared/ui/Text';

interface NotFoundPageProps {
  className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();

  return (
    <Page className={className} data-testid="NotFoundPage">
      <Text title={t('Страница не найдена')} bold size="l" />
    </Page>
  );
};

export default NotFoundPage;
