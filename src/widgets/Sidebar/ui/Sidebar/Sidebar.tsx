import { useState } from 'react';
import cl from './Sidebar.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cl.Sidebar, { [cl.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cl.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>

      <div className={cl.items}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
          className={cl.item}
        >
          <MainIcon className={cl.icon} />
          <span className={cl.link}>{t('Главная')}</span>
        </AppLink>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.about}
          className={cl.item}
        >
          <AboutIcon className={cl.icon} />
          <span className={cl.link}>{t('О сайте')}</span>
        </AppLink>
      </div>

      <div className={cl.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cl.lang} />
      </div>
    </div>
  );
};
