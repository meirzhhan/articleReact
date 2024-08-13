import { ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';

import { customCl } from '@/shared/lib/hooks/useClassName';
import { DropdownDirection } from '@/shared/types/ui';

import { AppLink } from '../../../AppLink';
import { mapDirectionClass } from '../../styles/consts';
import popupCl from '../../styles/popup.module.scss';
import cl from './Dropdown.module.scss';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger?: ReactNode;
  direction?: DropdownDirection;
}

/**
 * Компонент Dropdown, используемый для создания выпадающего меню с элементами выбора. (Headless UI)
 *
 * @param {DropdownProps} props - Пропсы компонента Dropdown.
 * @returns {JSX.Element} - Возвращает JSX элемент для Dropdown.
 */

export function Dropdown(props: DropdownProps): JSX.Element {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClass[direction], popupCl.menu];

  return (
    <Menu as="div" className={customCl(popupCl.popup, {}, [className])}>
      <Menu.Button className={popupCl.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={customCl(cl.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={customCl(cl.item, { [popupCl.active]: active }, [])}
            >
              {item.content}
            </button>
          );

          if (item.href)
            return (
              <Menu.Item
                key={'DropdownItem: ' + index}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );

          return (
            <Menu.Item
              key={'DropdownItem: ' + index}
              as={Fragment}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
