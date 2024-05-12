import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './LoginForm.module.scss';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cl.LoginForm, {}, [className])}>
      <Input
        placeholder={t('Введите логин')}
        type="text"
        className={cl.input}
        autofocus
      />
      <Input
        placeholder={t('Введите пароль')}
        type="text"
        className={cl.input}
      />
      <Button className={cl.loginBtn}>{t('Войти')}</Button>
    </div>
  );
};
