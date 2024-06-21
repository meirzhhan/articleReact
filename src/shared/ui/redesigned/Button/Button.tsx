import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import cl from './Button.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

export type ButtonVariable = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariable;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    variant = 'outline',
    square,
    size = 'm',
    disabled,
    children,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cl.square]: square,
    [cl.disabled]: disabled,
    [cl.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classNames(cl.Button, mods, [
        className,
        cl[variant],
        cl[size],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
