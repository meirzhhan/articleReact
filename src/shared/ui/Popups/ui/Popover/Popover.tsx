import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Popover.module.scss';
import { Popover as HPopover } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { ReactNode } from 'react';
import { mapDirectionClass } from '../../styles/consts';
import popupCl from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, trigger, direction = 'bottom right', children } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover
      className={classNames(cl.Popover, {}, [className, popupCl.popup])}
    >
      <HPopover.Button as="div" className={popupCl.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cl.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}
