import { LinkProps } from 'react-router-dom';
import cl from './AppLink.module.scss';

import { useClassName } from '@/shared/lib/hooks/useClassName';
import { ReactNode, memo } from 'react';
import { NavLink } from 'react-router-dom';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

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
