import { memo } from 'react';

import { CommentType } from '@/entities/Comment/model/types/comment';

import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { UserCard } from '@/shared/ui/UserCard';

interface CommentCardProps {
  className?: string;
  comment?: CommentType; // Данные комментария
  isLoading?: boolean; // Флаг загрузки данных комментария.
}

/**
 * Компонент для отображения карточки комментария.
 *
 * @param {CommentCardProps} props Свойства компонента.
 * @returns {JSX.Element | null} JSX-элемент, представляющий карточку комментария.
 */

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  // Если данные комментария загружаются, отображается Skeleton
  if (isLoading) {
    return (
      <Card padding="24" maxWidth border="partial" flexColumn gap="8">
        <HStack gap="8">
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={150} height={16} border="12px" />
        </HStack>
        <Skeleton border="12px" height={30} />
      </Card>
    );
  }

  // Если комментарий отсутствует, возвращает null.
  if (!comment) return null;

  // Отображение комментария.
  return (
    <Card
      className={className}
      padding="24"
      border="partial"
      maxWidth
      flexColumn
      gap="8"
    >
      <UserCard imgSize={30} user={comment.user} />

      <Text text={comment?.text} />
    </Card>
  );
});
