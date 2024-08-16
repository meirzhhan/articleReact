import { memo } from 'react';

import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { Notification } from '../../model/types/notification';
import { Skeleton } from '@/shared/ui/Skeleton';

interface NotificationCardProps {
  className?: string;
  item?: Notification; // Объект уведомления.
  isLoading: boolean;
}

/**
 * Компонент для отображения карточки уведомления.
 *
 * @param {NotificationCardProps} props - Свойства компонента.
 * @returns {JSX.Element} JSX-элемент, представляющий уведомление.
 */

export const NotificationCard = memo((props: NotificationCardProps) => {
  const { className, item, isLoading } = props;

  if (isLoading) {
    return (
      <Card border="partial" maxWidth flexColumn gap="8" noShadow>
        <Skeleton border="12px" height={24} width={'70%'} />
        <Skeleton border="12px" height={16} width={'100%'} />
      </Card>
    );
  }

  // Контент карточки с уведомлением
  const content = (
    <Card
      className={className}
      border="partial"
      maxWidth
      noShadow
      variant="light"
    >
      <Text title={item?.title} text={item?.description} />
    </Card>
  );

  // Если есть ссылка переданная по пропсу, оборачивает в <a>
  if (item?.href)
    return (
      <a
        target="_blank"
        href={item.href}
        rel="noreferrer"
        style={{ width: '100%' }}
      >
        {content}
      </a>
    );

  //если нет ссылки, то без <a>
  return content;
});
