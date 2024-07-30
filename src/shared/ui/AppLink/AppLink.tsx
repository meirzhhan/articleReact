import { ReactNode, memo } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { useClassName } from '@/shared/lib/hooks/useClassName';
import cl from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

/**
 * Кастомный `AppLink` для навигации с использованием `NavLink`.
 * @param {AppLinkProps} props - Свойства компонента.
 * @returns {JSX.Element} - Ссылка с поддержкой активного состояния и варианта стиля.
 */

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    variant = 'primary',
    children,
    activeClassName = '',
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        useClassName(cl.AppLink, { [activeClassName]: isActive }, [
          className,
          cl[variant],
        ])
      }
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
