import { useTranslation } from 'react-i18next';
import cl from './SidebarItem.module.scss';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemsType } from '../../model/types/sidebar';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SidebarItemProps {
  item: SidebarItemsType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation('sidebar');
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cl.item, { [cl.collapsed]: collapsed }, [])}
    >
      <item.Icon className={cl.icon} />
      <span className={cl.link}>{t(item.text)}</span>
    </AppLink>
  );
});
