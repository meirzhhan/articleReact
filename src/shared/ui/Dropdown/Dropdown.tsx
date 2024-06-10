import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';

import cl from './Dropdown.module.scss';
import { Fragment } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cl.optionsBottomLeft,
  'bottom right': cl.optionsBottomRight,
  'top left': cl.optionsTopLeft,
  'top right': cl.optionsTopRight,
};

export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(cl.Dropdown, {}, [className])}>
      <Menu.Button className={cl.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cl.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(cl.item, { [cl.active]: active }, [])}
            >
              {item.content}
            </button>
          );

          if (item.href)
            return (
              <Menu.Item
                key={item.href}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );

          return (
            <Menu.Item key={item.href} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
