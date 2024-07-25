import { useTranslation } from 'react-i18next';
import { memo, Suspense, useCallback, useEffect } from 'react';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from './../../model/selectors/comments';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { classNames } from '@/shared/lib/classNames/classNames';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Loader } from '@/shared/ui/deprecated/Loader';

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
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text size="l" title={t('Комментарии')} />}
          off={<TextDeprecated size={TextSize.L} title={t('Комментарии')} />}
        />
        <Suspense fallback={<Loader />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>

        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
    );
  },
);
