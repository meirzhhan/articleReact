import {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
} from 'react';
import cl from './Button.module.scss';
import { Mods, useClassName } from '@/shared/lib/hooks/useClassName';

export type ButtonVariable = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariable;
  color?: ButtonColor;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      className,
      variant = 'outline',
      square,
      size = 'm',
      disabled,
      children,
      fullWidth,
      addonLeft,
      addonRight,
      color = 'normal',
      ...otherProps
    } = props;

    const mods: Mods = {
      [cl.square]: square,
      [cl.disabled]: disabled,
      [cl.fullWidth]: fullWidth,
      [cl.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
      <button
        type="button"
        className={useClassName(cl.Button, mods, [
          className,
          cl[variant],
          cl[size],
          cl[color],
        ])}
        disabled={disabled}
        ref={ref}
        {...otherProps}
      >
        <div className={cl.addonLeft}>{addonLeft}</div>
        {children}
        <div className={cl.addonRight}>{addonRight}</div>
      </button>
    );
  },
);
