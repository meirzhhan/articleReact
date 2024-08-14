import { memo, Suspense, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AddCommentForm } from '@/features/addCommentForm';

import { CommentList } from '@/entities/Comment';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleComments } from '../../model/slices/articleCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';

interface ArticleCommentsProps {
  className?: string;
  id?: string; // ID статьи
}

/**
 * Компонент для отображения комментариев статьи и feature добавления комментария.
 *
 * @param {ArticleCommentsProps} props - Пропсы компонента.
 * @returns {JSX.Element} Компонент для отображения комментариев и формы добавления комментария.
 */

export const ArticleComments = memo((props: ArticleCommentsProps) => {
  const { className, id } = props;

  const { t } = useTranslation('article-info');
  const dispatch = useAppDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  // Загрузка всех комментариев
  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch, id]);

  // Функция для добавления комментария, передается пропсом в <AddCommentForm />
  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  return (
    <VStack className={className} gap="16" maxWidth>
      <Text size="l" title={t('Комментарии')} />

      <Suspense fallback={<></>}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>

      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </VStack>
  );
});
