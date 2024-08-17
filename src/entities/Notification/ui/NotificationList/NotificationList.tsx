import { memo } from 'react';

import { VStack } from '@/shared/ui/Stack';

import { useNotifications } from '../../api/notificationApi';
import { NotificationCard } from '../NotificationItem/NotificationCard';

/**
 * Компонент для отображения списка уведомлений.
 *
 * @param {NotificationListProps} props - Свойства компонента.
 * @returns {JSX.Element} JSX-элемент, представляющий список уведомлений.
 */

export const NotificationList = memo(
  ({ className }: { className?: string }) => {
    const { data, isLoading } = useNotifications(null, {
      pollingInterval: 5000,
    });

    // Отображение скелетонов при загрузке
    if (isLoading) {
      return (
        <VStack gap="16" className={className}>
          {[1, 2, 3, 4].map((index) => (
            <NotificationCard key={index} isLoading />
          ))}
        </VStack>
      );
    }

    return (
      <VStack gap="16" className={className}>
        {data?.map((item) => (
          <NotificationCard key={item.id} item={item} isLoading={isLoading} />
        ))}
      </VStack>
    );
  },
);
