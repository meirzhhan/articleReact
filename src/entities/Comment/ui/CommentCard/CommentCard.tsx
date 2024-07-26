import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './CommentCard.module.scss';
import { CommentType } from '@/entities/Comment/model/types/comment';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentCardProps {
  className?: string;
  comment?: CommentType;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

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

  if (!comment) return null;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card padding="24" border="partial" max>
          <VStack
            max
            gap={'8'}
            className={classNames(cl.CommentCardRedesigned, {}, [className])}
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
      }
      off={
        <VStack
          max
          gap={'8'}
          className={classNames(cl.CommentCard, {}, [className])}
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment.user.id)}
            className={cl.header}
          >
            {comment?.user.avatar ? (
              <AvatarDeprecated size={30} src={comment.user.avatar} />
            ) : null}

            <TextDeprecated
              className={cl.username}
              title={comment?.user.username}
            />
          </AppLinkDeprecated>

          <TextDeprecated className={cl.text} text={comment?.text} />
        </VStack>
      }
    />
  );
});
