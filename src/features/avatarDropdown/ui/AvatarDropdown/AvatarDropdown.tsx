import { customCl } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import {
  getRouteAdmin,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/consts/router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) return null;

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            // content: t('Админка', { $Dictionary: 's' }), // TODO: t('')
            content: t('Админка'),
            href: getRouteAdmin(),
          },
        ]
      : []),
    {
      content: t('Профиль'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('Настройки'),
      href: getRouteSettings(),
    },
    {
      content: t('Выйти'),
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
      className={customCl('', {}, [className])}
      direction="bottom left"
      items={items}
      trigger={<Avatar size={40} src={authData.avatar} />}
    />
  );
});
