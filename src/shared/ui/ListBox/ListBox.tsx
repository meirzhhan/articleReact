import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import cl from './ListBox.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';
import { DropdownDirection } from 'shared/types/ui';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cl.optionsBottomLeft,
  'bottom right': cl.optionsBottomRight,
  'top left': cl.optionsTopLeft,
  'top right': cl.optionsTopRight,
};

export function ListBox(props: ListBoxProps) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

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
