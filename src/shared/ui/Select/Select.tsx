import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ChangeEvent, useMemo } from 'react';
import cl from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, onChange, value, readonly } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value as T);
    }
  };

  const optionsList = useMemo(
    () =>
      options?.map((opt) => (
        <option className={cl.option} value={opt.value} key={opt.value}>
          {opt.content}
        </option>
      )),
    [options],
  );

  const mods: Mods = {
    [cl.readonly]: readonly,
  };

  return (
    <div className={classNames(cl.Wrapper, mods, [className])}>
      {label && <span className={cl.label}>{`${label}>`}</span>}
      <select
        disabled={readonly}
        className={cl.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
};
