import cl from './Navbar.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

import { memo, useCallback, useState } from 'react';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { Button } from '@/shared/ui/redesigned/Button';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
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
      <header className={classNames(cl.NavbarRedesigned, {}, [className])}>
        <HStack gap="16" className={cl.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cl.NavbarRedesigned, {}, [className])}>
      <Button variant="clear" className={cl.links} onClick={onShowModal}>
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
