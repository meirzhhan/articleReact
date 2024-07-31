import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LoginModal } from '@/features/AuthByUsername';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';

import { getUserAuthData } from '@/entities/User';

import { Button } from '@/shared/ui/Button';
import { useClassName } from '@/shared/lib/hooks/useClassName';

import cl from './Header.module.scss';
import { Card } from '@/shared/ui/Card';

interface NavbarProps {
  className?: string;
}

/**
 * Компонент Header отображает навигационную панель, которая меняется в зависимости от состояния аутентификации пользователя.
 *
 * @param {NavbarProps} props - Свойства для компонента.
 * @returns {JSX.Element} Отрендеренный компонент заголовка.
 */

export const Header = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={useClassName(cl.Header, {}, [className])}>
        <Card variant="light" className={cl.actions} border="round">
          <AvatarDropdown />
          <NotificationButton />
        </Card>
      </header>
    );
  }

  return (
    <header className={useClassName(cl.Header, {}, [className])}>
      <Button variant="filled" onClick={onShowModal}>
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
