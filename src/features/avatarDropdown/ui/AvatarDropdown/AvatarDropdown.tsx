import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';

import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getRouteAdmin,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/consts/router';

interface AvatarDropdownProps {
  className?: string;
}

/**
 * Компонент `AvatarDropdown` отображает выпадающее меню для пользователя.
 * В меню включены ссылки на админку, профиль, настройки и возможность выхода из системы.
 *
 * @param {AvatarDropdownProps} props - Свойства компонента.
 * @param {string} [props.className] - Дополнительный класс для стилизации компонента.
 * @returns {JSX.Element | null} - Возвращает элемент меню или null, если нет данных авторизации.
 */

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const authData = useSelector(getUserAuthData);

  //  Обработчик выхода из системы. Dispatch действие выхода из системы.
  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) return null;

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
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
      className={useClassName('', {}, [className])}
      direction="bottom left"
      items={items}
      trigger={<Avatar size={40} src={authData.avatar} />}
    />
  );
});
