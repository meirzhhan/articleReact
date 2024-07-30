import { useTranslation } from 'react-i18next';
import cl from './SidebarItem.module.scss';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemsType } from '../../model/types/sidebar';
import { customCl } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';

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
      to={item.path}
      className={customCl(
        cl.itemRedesigned,
        {
          [cl.collapsedRedesigned]: collapsed,
        },
        [],
      )}
      activeClassName={cl.active}
    >
      <Icon Svg={item.Icon} />
      <span className={cl.link}>{t(item.text)}</span>
    </AppLink>
  );
});
