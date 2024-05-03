import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';

//Component only for testing ErrorBoundary
const BugButton = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(false);

  const onThrow = () => setError(true);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return <Button onClick={onThrow}>{t('Выбросить ошибку')}</Button>;
};

export default BugButton;
