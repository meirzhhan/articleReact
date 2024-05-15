import { useTranslation } from 'react-i18next';
import cl from './SidebarItem.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemsType } from 'widgets/Sidebar/model/items';
import { memo } from 'react';
import { classNames } from './../../../../shared/lib/classNames/classNames';

interface SidebarItemProps {
  item: SidebarItemsType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cl.item, { [cl.collapsed]: collapsed })}
    >
      <item.Icon className={cl.icon} />
      <span className={cl.link}>{t(item.text)}</span>
    </AppLink>
  );
});
