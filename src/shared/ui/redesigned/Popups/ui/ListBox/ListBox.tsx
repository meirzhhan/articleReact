import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import cl from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../../../redesigned/Stack';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCl from '../../styles/popup.module.scss';
import { Button } from '../../../Button';
import ArrowIcon from '@/shared/assets/icons/arrow-bottomNew.svg';
import { Icon } from '../../../Icon';
export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  items?: ListBoxItem<T>[];
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
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

  const optionsClasses = [mapDirectionClass[direction], popupCl.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

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
          <Button
            variant="filled"
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
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
                      [popupCl.selected]: selected,
                    },
                    [],
                  )}
                >
                  {item.content}
                </li>
              )}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </HStack>
  );
}
