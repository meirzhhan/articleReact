import { ReactNode } from 'react';
import { Popover as HPopover } from '@headlessui/react';

import { customCl } from '@/shared/lib/hooks/useClassName';
import { DropdownDirection } from '@/shared/types/ui';

import { mapDirectionClass } from '../../styles/consts';
import popupCl from '../../styles/popup.module.scss';
import cl from './Popover.module.scss';

// TODO: ?
/**
 * Пропсы для компонента Popover.
 * @interface PopoverProps
 * @property {string} [className] - Дополнительный CSS класс для компонента Popover. Используется для применения пользовательских стилей.
 * @property {DropdownDirection} [direction='bottom right'] - Направление отображения поповера. Определяет, где будет размещен поповер относительно триггера.
 * @property {ReactNode} trigger - Элемент, который служит триггером для отображения поповера. Может быть кнопка, иконка или любой другой элемент.
 * @property {ReactNode} children - Содержимое поповера, которое будет отображаться при активации.
 */
interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

/**
 * Компонент Popover, используемый для создания всплывающих панелей или подсказок.
 *
 * @param {PopoverProps} props - Пропсы компонента Popover.
 * @returns {JSX.Element} - Возвращает JSX элемент для Popover.
 */

export function Popover(props: PopoverProps) {
  const { className, trigger, direction = 'bottom right', children } = props;

  const menuClasses = [mapDirectionClass[direction], popupCl.menu];

  return (
    <HPopover className={customCl(popupCl.popup, {}, [className])}>
      <HPopover.Button as="div" className={popupCl.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={customCl(cl.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}
