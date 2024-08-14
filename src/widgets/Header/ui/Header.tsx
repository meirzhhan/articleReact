import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LoginModal } from '@/features/authentication';
import { NotificationTrigger } from '@/features/notificationTrigger';
import { AvatarDropdown } from '@/features/avatarDropdown';

import { getUserAuthData } from '@/entities/User';

import { Button } from '@/shared/ui/Button';

import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';

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
      <VStack className={className} align="end">
        <Card padding="16" max headersStyle columnGap="4" variant="light">
          <AvatarDropdown />
          <NotificationTrigger />
        </Card>
      </VStack>
    );
  }

  return (
    <>
      <Card padding="16" headersStyle max variant="light">
        <Button variant="clear" onClick={onShowModal}>
          {t('Войти')}
        </Button>
      </Card>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </>
  );
});
