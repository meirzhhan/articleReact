import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './NotificationButton.module.scss';
import { Popover } from 'shared/ui/Popups';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { NotificationList } from 'entities/Notification';

interface notificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: notificationButtonProps) => {
  const { className } = props;
  return (
    <Popover
      className={classNames(cl.NotificationButton, {}, [className])}
      direction="bottom left"
      trigger={
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      }
    >
      <NotificationList className={cl.notifications} />
    </Popover>
  );
});
