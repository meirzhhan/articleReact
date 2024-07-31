import { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';

import { VStack } from '@/shared/ui/Stack';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Icon } from '@/shared/ui/Icon';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import ArrowIcon from '@/shared/assets/icons/arrow-bottomNew.svg';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cl from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

/**
 * Компонент Sidebar отображает боковую панель навигации.
 * Панель может быть свернута или развернута, а также включает в себя переключатели темы и языка.
 *
 * @param {SidebarProps} props - Свойства для компонента.
 * @returns {JSX.Element} Отрендеренный компонент боковой панели.
 */

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
      className={useClassName(cl.Sidebar, { [cl.collapsed]: collapsed }, [
        className,
      ])}
    >
      <AppLogo size={collapsed ? 30 : 50} className={cl.appLogo} />

      <VStack role="navigation" gap="8" className={cl.items}>
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
