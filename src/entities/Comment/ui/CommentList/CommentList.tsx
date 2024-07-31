import { useClassName } from '@/shared/lib/hooks/useClassName';
import { memo } from 'react';
import { CommentType } from '@/entities/Comment/model/types/comment';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface CommentListProps {
  className?: string;
  comments?: CommentType[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation('article-details');

  if (isLoading)
    <VStack gap={'16'} maxWidth className={useClassName('', {}, [className])}>
      <CommentCard isLoading />
      <CommentCard isLoading />
      <CommentCard isLoading />
    </VStack>;

  return (
    <VStack gap={'16'} maxWidth className={useClassName('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </VStack>
  );
});
