import { ButtonHTMLAttributes, FC } from 'react';
import cl from './Button.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
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
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme,
    square,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cl[theme]]: true,
    [cl.square]: square,
    [cl[size]]: true,
  };

  return (
    <button
      type="button"
      // className={classNames(cl.Button, {}, [className, cl[theme]])}
      className={classNames(cl.Button, mods, [className])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
