import { customCl } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './CommentCard.module.scss';
import { CommentType } from '@/entities/Comment/model/types/comment';
import { Skeleton } from '@/shared/ui/Skeleton';
import { getRouteProfile } from '@/shared/consts/router';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';

interface CommentCardProps {
  className?: string;
  comment?: CommentType;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack
        gap="8"
        max
        className={customCl(cl.CommentCard, {}, [className, cl.loading])}
      >
        <div className={cl.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} className={cl.username} />
        </div>
        <Skeleton className={cl.text} width={'100%'} height={50} />
      </VStack>
    );
  }

  if (!comment) return null;

  return (
    <Card padding="24" border="partial" max>
      <VStack
        max
        gap={'8'}
        className={customCl(cl.CommentCardRedesigned, {}, [className])}
      >
        <AppLink to={getRouteProfile(comment.user.id)}>
          <HStack gap="8">
            {comment?.user.avatar ? (
              <Avatar size={30} src={comment.user.avatar} />
            ) : null}

            <Text text={comment?.user.username} bold />
          </HStack>
        </AppLink>

        <Text text={comment?.text} />
      </VStack>
    </Card>
  );
});
