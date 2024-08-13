import {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react';

import { Mods, customCl } from '@/shared/lib/hooks/useClassName';
import cl from './Button.module.scss';

export type ButtonVariable = 'clear' | 'outline' | 'filled'; // Типы возможных вариантов кнопки.
export type ButtonColor = 'normal' | 'success' | 'error'; // Типы возможных цветов кнопки.
export type ButtonSize = 'm' | 'l' | 'xl'; // Типы возможных размеров кнопки.

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

/**
 * Компонент `Button` отображает кнопку с возможностью настройки стилей и содержимого.
 *
 * @param {ButtonProps} props - Пропсы компонента.
 * @param {ForwardedRef<HTMLButtonElement>} ref - Ссылка на элемент кнопки.
 * @returns {JSX.Element} - Рендерит кнопку с заданными стилями, размерами и содержимым.
 */

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
        className={customCl(cl.Button, mods, [
          className,
          cl[variant],
          cl[size],
          cl[color],
        ])}
        disabled={disabled}
        ref={ref}
        {...otherProps}
      >
        <div className={cl.Button__addOnLeft}>{addonLeft}</div>
        {children}
        <div className={cl.Button__addOnRight}>{addonRight}</div>
      </button>
    );
  },
);
