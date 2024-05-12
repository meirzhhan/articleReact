import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Input.module.scss';
import React, {
  InputHTMLAttributes,
  memo,
  useState,
  useEffect,
  useRef,
} from 'react';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlur = () => {
    setIsFocused(false);
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  return (
    <div className={classNames(cl.InputWrapper, {}, [className])}>
      {placeholder && <div className={cl.placeholder}>{`${placeholder}>`}</div>}

      <div className={cl.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cl.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...otherProps}
        />
        {isFocused && (
          <span
            className={cl.caret}
            style={{ left: `${caretPosition * 9}px` }}
          />
        )}
      </div>
    </div>
  );
});
