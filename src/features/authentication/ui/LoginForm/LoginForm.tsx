import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { customCl } from '@/shared/lib/hooks/useClassName';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import cl from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void; // функция, которая будет вызываться при успешном входе в систему
}

/**
 * Список reducer-ов для динамической загрузки для DynamicModuleLoader.
 */
const reducers: ReducersList = {
  loginForm: loginReducer,
};

// При монтировании компонента асинхронно добавляется loginReducer затем демонтируется

/**
 * Компонент формы авторизации пользователя.
 * @param {LoginFormProps} props - Свойства компонента.
 * @returns {JSX.Element} - Возвращает JSX элемент.
 */
const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation('');

  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  // Функция для изменения значения username
  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  // Функция для изменения значения password
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  // Функция для выполнения авторизации
  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      window.location.reload(); // Перезагрузка страницы после успешной авторизации
    }
  }, [onSuccess, dispatch, password, username]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
      <VStack gap="24" className={customCl(cl.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')} />
        {error && <Text text={error} variant="error" />}

        <Input
          placeholder={t('Введите логин')}
          type="text"
          autofocus
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          placeholder={t('Введите пароль')}
          type="password"
          onChange={onChangePassword}
          value={password}
        />
        <Button
          className={cl.loginBtn}
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {t('Войти')}
        </Button>
      </VStack>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
