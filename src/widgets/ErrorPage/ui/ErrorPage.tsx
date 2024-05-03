import { classNames } from 'shared/lib/classNames/classNames';
import cl from './ErrorPage.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';

interface ErrorPageProps {
  className?: string;
}

const ErrorPage = ({ className }: ErrorPageProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames(cl.ErrorPage, {}, [className])}>
      <p>{t('Произошла ошибка')}</p>
      <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
    </div>
  );
};

export default ErrorPage;
