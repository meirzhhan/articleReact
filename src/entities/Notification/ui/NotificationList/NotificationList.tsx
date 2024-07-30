import { useClassName } from '@/shared/lib/hooks/useClassName';
import { memo } from 'react';
import cl from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from '@/shared/ui/Skeleton';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;

  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max // skeleton
        className={useClassName(cl.NotificationList, {}, [className])}
      >
        <Skeleton width={'100%'} border={'12px'} height={'80px'} />
        <Skeleton width={'100%'} border={'12px'} height={'80px'} />
        <Skeleton width={'100%'} border={'12px'} height={'80px'} />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      // max
      className={useClassName(cl.NotificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
