import { ButtonHTMLAttributes, FC } from 'react';
import cl from './Button.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, children, theme, ...otherProps } = props;

  return (
    <button
      type="button"
      className={classNames(cl.Button, {}, [className, cl[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
