import { Fragment, ReactNode, useState } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import cl from './ListBox.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropdownDirection = 'top' | 'bottom';

interface ListBoxProps {
  className?: string;
  items?: ListBoxItem[];
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

const mapDirectionClasses: Record<DropdownDirection, string> = {
  bottom: cl.optionsBottom,
  top: cl.optionsTop,
};

export function ListBox(props: ListBoxProps) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom',
    label,
  } = props;

  const optionsClasses = [mapDirectionClasses[direction]];

  return (
    <HStack gap="4" className={readonly ? cl.readonly : ''}>
      {label && <span>{`${label}>`} </span>}
      <HListbox
        disabled={readonly}
        as="div"
        className={classNames(cl.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListbox.Button disabled={readonly} className={cl.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListbox.Button>

        <HListbox.Options
          className={classNames(cl.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListbox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cl.item,
                    { [cl.active]: active, [cl.disabled]: item.disabled },
                    [],
                  )}
                >
                  {item.content}
                  {selected && '✔'}
                </li>
              )}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </HStack>
  );
}
