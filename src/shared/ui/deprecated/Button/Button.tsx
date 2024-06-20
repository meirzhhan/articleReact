import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import cl from './Button.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

/**
 * new UI kit added
 * @deprecated
 */

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    theme = ButtonTheme.OUTLINE,
    square,
    size = ButtonSize.M,
    disabled,
    children,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cl[theme]]: true,
    [cl.square]: square,
    [cl[size]]: true,
    [cl.disabled]: disabled,
    [cl.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classNames(cl.Button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
