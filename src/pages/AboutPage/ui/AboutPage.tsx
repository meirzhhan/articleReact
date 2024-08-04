import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/Text';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <Page data-testid="AboutPage">
      <Text title={t('О сайте')} bold />
    </Page>
  );
};

export default AboutPage;
