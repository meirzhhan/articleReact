import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

import { customCl } from '@/shared/lib/hooks/useClassName';
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
 * Поддерживает разные стили и активное состояние ссылки.
 *
 * @param {ForwardedRef<HTMLAnchorElement>} ref - Ссылка на элемент `a`.
 * @returns {JSX.Element} - Ссылка с поддержкой активного состояния и варианта стиля.
 */
export const AppLink = forwardRef(
  (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
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
        ref={ref}
        to={to}
        className={({ isActive }) =>
          customCl(cl.AppLink, { [activeClassName]: isActive }, [
            className,
            cl[variant],
          ])
        }
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  },
);
