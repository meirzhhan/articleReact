import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { CommentType } from '@/entities/Comment/model/types/comment';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentListProps {
  className?: string;
  comments?: CommentType[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation('article-details');

  if (isLoading)
    <VStack gap={'16'} max className={classNames('', {}, [className])}>
      <CommentCard isLoading />
      <CommentCard isLoading />
      <CommentCard isLoading />
    </VStack>;

  return (
    <VStack gap={'16'} max className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text text={t('Комментарии отсутствуют')} />}
          off={<TextDeprecated text={t('Комментарии отсутствуют')} />}
        />
      )}
    </VStack>
  );
});
