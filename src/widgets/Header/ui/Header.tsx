import cl from './Header.module.scss';

import { useClassName } from '@/shared/lib/hooks/useClassName';
import { useTranslation } from 'react-i18next';

import { memo, useCallback, useState } from 'react';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { Button } from '@/shared/ui/Button';

interface NavbarProps {
  className?: string;
}

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
      <header className={useClassName(cl.NavbarRedesigned, {}, [className])}>
        <HStack gap="16" className={cl.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={useClassName(cl.NavbarRedesigned, {}, [className])}>
      <Button variant="clear" className={cl.links} onClick={onShowModal}>
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
