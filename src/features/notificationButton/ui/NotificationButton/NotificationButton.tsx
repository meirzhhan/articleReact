import { useClassName } from '@/shared/lib/hooks/useClassName';
import { memo, useCallback, useState } from 'react';
import cl from './NotificationButton.module.scss';

import NotificationIcon from '@/shared/assets/icons/notificationNew.svg';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';
// import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';

interface notificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: notificationButtonProps) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false); // test

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
    <div>
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
    </div>
  );
});
