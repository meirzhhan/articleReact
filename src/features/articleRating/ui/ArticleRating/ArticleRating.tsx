import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { RatingCard } from '@/entities/Rating';

import { Skeleton } from '@/shared/ui/Skeleton';

import {
  useGetArticleRating,
  useRateArticle,
} from '../../api/articleRatingApi';

export interface ArticleRatingProps {
  className?: string;
  articleId: string; // ID статьи для оценки.
}

/**
 * feature для оценки статьи, из entity RatingCard.
 * @param props - Пропсы компонента.
 * @returns JSX элемент.
 */

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation('article-info');

  const userData = useSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRating({
    userId: userData?.id ?? '',
    articleId,
  });

  // [Функция, которая вызывает мутацию, объект с аргументами] TODO:
  const [rateArticleMutation, {}] = useRateArticle();

  /**
   * Обработчик для отправки оценки статьи.
   * @param starsCount - Количество звезд.
   * @param feedback - Отзыв (необязательно).
   */
  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
  );

  /**
   * Обработчик для принятия оценки.
   * @param starsCount - Количество звезд.
   * @param feedback - Отзыв (необязательно).
   */
  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  /**
   * Обработчик для отмены оценки.
   * @param starsCount - Количество звезд.
   */
  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return <Skeleton width={'100%'} height={120} border="12px" />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      className={className}
      title={t('Оцените статью')}
      feedbackTitle={t('Оставьте свой отзыв')}
      hasFeedback
    />
  );
});

export default ArticleRating;
