import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CommentType } from '@/entities/Comment/model/types/comment';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: CommentType[]; // Массив комментариев.
  isLoading?: boolean; // Флаг загрузки комментариев.
}

/**
 * Компонент для отображения списка комментариев.
 *
 * @param {CommentListProps} props Свойства компонента.
 * @returns {JSX.Element} JSX-элемент, представляющий список комментариев.
 */

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation('article-details');

  // Если комментарии загружаются, передача флага isLoading для отображения скелетона
  // if (1)
  if (isLoading) {
    return (
      <VStack gap={'16'} maxWidth className={className}>
        {[1, 2, 3, 4].map((index) => (
          <CommentCard key={index} isLoading={true} />
        ))}
      </VStack>
    );
  }

  return (
    <VStack gap={'16'} maxWidth className={className}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </VStack>
  );
});
