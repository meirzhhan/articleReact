import {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react';

import { Mods, customCl } from '@/shared/lib/hooks/useClassName';
import cl from './Button.module.scss';

export type ButtonVariable = 'clear' | 'outline' | 'filled'; // Типы возможных вариантов кнопки.
export type ButtonColor = 'normal' | 'success' | 'error'; // Цветовые варианты кнопки.
export type ButtonSize = 'm' | 'l' | 'xl'; // Размеры кнопки.

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariable;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean; // Флаг для недоступности взаимодействия с кнопкой.
  children?: ReactNode;
  fullWidth?: boolean; // Флаг для максимальной ширины кнопки.
  addonLeft?: ReactNode; // Элемент, отображаемый слева от текста кнопки.
  addonRight?: ReactNode; // Элемент, отображаемый справа от текста кнопки.
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
      [cl.disabled]: disabled,
      [cl.fullWidth]: fullWidth,
      [cl.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    const additionalClasses = [className, cl[variant], cl[size], cl[color]];

    return (
      <button
        type="button"
        className={customCl(cl.Button, mods, additionalClasses)}
        disabled={disabled}
        ref={ref}
        {...otherProps}
      >
        {addonLeft && <div className={cl.addOnLeft}>{addonLeft}</div>}
        {children}
        {addonRight && <div className={cl.addOnRight}>{addonRight}</div>}
      </button>
    );
  },
);
