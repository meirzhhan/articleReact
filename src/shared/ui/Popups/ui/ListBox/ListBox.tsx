import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';

import { useClassName } from '@/shared/lib/hooks/useClassName';
import { DropdownDirection } from '@/shared/types/ui';
import ArrowIcon from '@/shared/assets/icons/arrow-bottomNew.svg';

import { HStack } from '../../../Stack';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { mapDirectionClass } from '../../styles/consts';

import popupCl from '../../styles/popup.module.scss';
import cl from './ListBox.module.scss';
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

/**
 * Компонент ListBox, используемый для создания выпадающего списка с элементами выбора. (Headless UI)
 *
 * @param {ListBoxProps<T>} props - Пропсы компонента ListBox.
 * @returns {JSX.Element} - Возвращает JSX элемент для ListBox.
 * @template T - Тип значения элемента списка.
 */

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

  // Определение выбранного элемента
  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

  return (
    <HStack gap="4" className={readonly ? cl.readonly : ''}>
      {label && <span>{`${label}>`} </span>}
      <HListbox
        disabled={readonly}
        as="div"
        className={useClassName(popupCl.popup, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListbox.Button
          as={Button}
          variant="filled"
          disabled={readonly}
          addonRight={<Icon Svg={ArrowIcon} />}
        >
          {selectedItem?.content ?? defaultValue}
        </HListbox.Button>

        <HListbox.Options
          className={useClassName(cl.options, {}, optionsClasses)}
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
                  className={useClassName(
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
