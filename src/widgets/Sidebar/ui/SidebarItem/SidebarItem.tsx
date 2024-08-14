import { memo } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';
import { customCl } from '@/shared/lib/hooks/useClassName';

import { SidebarItemsType } from '../../model/types/sidebar';
import cl from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';

interface SidebarItemProps {
  item: SidebarItemsType;
  collapsed: boolean;
}

/**
 * Компонент SidebarItem отображает элемент боковой панели навигации.
 * Если элемент доступен только для авторизованных пользователей и пользователь не авторизован, компонент не будет отображен.
 *
 * @param {SidebarItemProps} props - Свойства для компонента.
 * @returns {JSX.Element | null} Отрендеренный элемент боковой панели или null.
 */

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation('sidebar');
  const isAuth = useSelector(getUserAuthData);
  const className = customCl(cl.Item, { [cl.collapsed]: collapsed }, []);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink to={item.path} className={className} activeClassName={cl.active}>
      <Icon Svg={item.Icon} />
      <span className={cl.link}>{t(item.text)}</span>
    </AppLink>
  );
});
