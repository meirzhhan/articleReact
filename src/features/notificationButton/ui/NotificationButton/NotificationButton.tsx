import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import cl from './NotificationButton.module.scss';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notification.svg';
import NotificationIcon from '@/shared/assets/icons/notificationNew.svg';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} onClick={onOpenDrawer} clickable />}
      off={
        <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
    />
  );

  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Popover
              className={classNames(cl.NotificationButton, {}, [className])}
              direction="bottom left"
              trigger={trigger}
            >
              <NotificationList className={cl.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              className={classNames(cl.NotificationButton, {}, [className])}
              direction="bottom left"
              trigger={trigger}
            >
              <NotificationList className={cl.notifications} />
            </PopoverDeprecated>
          }
        />
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
