import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { Popover } from '@/shared/ui/Popups';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import NotificationIcon from '@/shared/assets/icons/notificationNew.svg';

import cl from './NotificationTrigger.module.scss';

interface NotificationTriggerProps {
  className?: string;
}

/**
 * Кнопка для отображения уведомлений.
 *
 * @param {NotificationButtonProps} props - Свойства компонента. *
 * @returns {JSX.Element} Компонент кнопки уведомлений с выпадающим списком уведомлений.
 */

export const NotificationTrigger = memo((props: NotificationTriggerProps) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

  // Открывает панель уведомлений. && Закрывает панель уведомлений.
  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Icon Svg={NotificationIcon} onClick={onOpenDrawer} clickable />
  );

  return (
    <>
      <BrowserView>
        <Popover
          className={useClassName(cl.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cl.notifications} />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </>
  );
});
