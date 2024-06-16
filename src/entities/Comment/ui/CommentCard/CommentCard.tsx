import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './CommentCard.module.scss';
import { CommentType } from '@/entities/Comment/model/types/comment';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/const/router';
import { VStack } from '@/shared/ui/Stack';

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
        className={classNames(cl.CommentCard, {}, [className, cl.loading])}
      >
        <div className={cl.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width={100} height={16} className={cl.username} />
        </div>
        <Skeleton className={cl.text} width={'100%'} height={50} />
      </VStack>
    );
  }

  if (!comment) null;

  return (
    <VStack
      max
      gap={'8'}
      className={classNames(cl.CommentCard, {}, [className])}
    >
      <AppLink
        to={`${RoutePath.profile}${comment?.user.id}`}
        className={cl.header}
      >
        {comment?.user.avatar ? (
          <Avatar size={30} src={comment.user.avatar} />
        ) : null}

        <Text className={cl.username} title={comment?.user.username} />
      </AppLink>

      <Text className={cl.text} text={comment?.text} />
    </VStack>
  );
});
