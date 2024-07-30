import { useTranslation } from 'react-i18next';
import { memo, Suspense, useCallback, useEffect } from 'react';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from './../../model/selectors/comments';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch],
    );

    useEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
    }, [dispatch, id]);

    return (
      <VStack gap="16" max className={useClassName('', {}, [className])}>
        <Text size="l" title={t('Комментарии')} />
        <Suspense fallback={<></>}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>

        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
    );
  },
);
