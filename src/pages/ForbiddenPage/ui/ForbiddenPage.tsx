import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid="ForbiddenPage">
      {t('Нет прав доступа для этой страницы')}
    </Page>
  );
};

export default ForbiddenPage;
