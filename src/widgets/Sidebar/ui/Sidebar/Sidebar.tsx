import { useState, useMemo, memo } from 'react';
import cl from './Sidebar.module.scss';

import { useClassName } from '@/shared/lib/hooks/useClassName';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { VStack } from '@/shared/ui/Stack';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Icon } from '@/shared/ui/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottomNew.svg';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => {
    return sidebarItemsList.map((item) => (
      <SidebarItem key={item.path} item={item} collapsed={collapsed} />
    ));
  }, [collapsed, sidebarItemsList]);

  return (
    <aside
      data-testid="sidebar"
      className={useClassName(
        cl.SidebarRedesigned,
        { [cl.collapsedRedesigned]: collapsed },
        [className],
      )}
    >
      <AppLogo size={collapsed ? 30 : 50} className={cl.appLogo} />

      <VStack role="navigation" gap={'8'} className={cl.items}>
        {itemsList}
      </VStack>

      <Icon
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cl.collapseBtn}
        Svg={ArrowIcon}
        clickable
      />
      <div className={cl.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cl.lang} />
      </div>
    </aside>
  );
});
