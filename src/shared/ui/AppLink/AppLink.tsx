import { Link, LinkProps } from 'react-router-dom';
import cl from './AppLink.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo } from 'react';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    theme = AppLinkTheme.PRIMARY,
    children,
    ...otherProps
  } = props;
  return (
    <Link
      to={to}
      className={classNames(cl.AppLink, {}, [className, cl[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
