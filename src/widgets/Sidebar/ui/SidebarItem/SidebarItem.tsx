import { useTranslation } from 'react-i18next';
import cl from './SidebarItem.module.scss';
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemsType } from '../../model/types/sidebar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <AppLink
          to={item.path}
          className={classNames(
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
      }
      off={
        <AppLinkDeprecated
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
          className={classNames(cl.item, { [cl.collapsed]: collapsed }, [])}
        >
          <item.Icon className={cl.icon} />
          <span className={cl.link}>{t(item.text)}</span>
        </AppLinkDeprecated>
      }
    />
  );
});
