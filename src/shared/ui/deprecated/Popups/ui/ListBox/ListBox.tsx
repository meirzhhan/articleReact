import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import cl from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../../../redesigned/Stack';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCl from '../../styles/popup.module.scss';
import { Button } from '../../../Button';

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

/**
 * new UI kit added
 * @deprecated
 */

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
        className={classNames(cl.ListBox, {}, [className, popupCl.popup])}
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
                    {
                      [popupCl.active]: active,
                      [popupCl.disabled]: item.disabled,
                    },
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
