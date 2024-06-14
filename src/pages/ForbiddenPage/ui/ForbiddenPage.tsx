import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return <Page>{t('Нет прав доступа для этой страницы')}</Page>;
};

export default ForbiddenPage;
