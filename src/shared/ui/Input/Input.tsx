import React, {
  InputHTMLAttributes,
  memo,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';

import { Mods, customCl } from '@/shared/lib/hooks/useClassName';

import { HStack } from '../Stack';
import { Text } from '../Text';
import cl from './Input.module.scss';

// Пропсы для компонента Input, исключая value, onChange, readOnly и size.
type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';
interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number; // поле ввода.
  label?: string; // Отображается перед полем ввода№
  onChange?: (value: string) => void;
  autofocus?: boolean; // Флаг, определяющий, автоматическое фокусирование на поле ввода при монтировании компонента.
  readonly?: boolean; // Флаг, определяющий, является ли поле ввода только для чтения.
  addonLeft?: ReactNode; // Дополнительный элемент, отображаемый слева от поля ввода и внутри контейнера.
  addonRight?: ReactNode; // Дополнительный элемент, отображаемый справа от поля ввода и внутри контейнера.
  size?: InputSize; // Размер поля ввода.
}

/**
 * Компонент input с поддержкой метки, дополнительных элементов и различных размеров.
 *
 * @param {InputProps} props - Пропсы компонента Input.
 * @returns {JSX.Element} - Возвращает JSX элемент, представляющий поле ввода.
 */

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    label,
    size = 'm',
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onBlur = () => {
    setIsFocused(false);
  };
  const onFocus = () => {
    setIsFocused(true);
  };

  const mods: Mods = {
    [cl.readonly]: readonly,
    [cl.focused]: isFocused,
    [cl.withAddonLeft]: Boolean(addonLeft),
    [cl.withAddonRight]: Boolean(addonRight),
  };

  const input = (
    <div className={customCl(cl.InputWrapper, mods, [className, cl[size]])}>
      <div className={cl.addOnLeft}>{addonLeft}</div>
      <input
        className={cl.input}
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readonly}
        placeholder={placeholder}
        {...otherProps}
      />
      <div className={cl.addOnRight}>{addonRight}</div>
    </div>
  );

  if (label)
    return (
      <HStack maxWidth gap="16">
        <Text className={cl.label} text={label} />
        {input}
      </HStack>
    );

  return input;
});
