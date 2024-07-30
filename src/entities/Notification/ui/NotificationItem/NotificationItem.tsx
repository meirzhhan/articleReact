import { useClassName } from '@/shared/lib/hooks/useClassName';
import { memo } from 'react';
import cl from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const content = (
    <Card
      className={useClassName(cl.NotificationItem, {}, [className])}
      border="default"
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href)
    return (
      <a className={cl.link} target="_blank" href={item.href} rel="noreferrer">
        {content}
      </a>
    );

  return content;
});
