import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

/**
 * Аргументы для получения рейтинга статьи.
 */
interface GetArticleRatingArg {
  userId: string; // ID пользователя.
  articleId: string; // ID статьи.
}

/**
 * Аргументы для оценки статьи.
 */
interface RateArticleArg {
  userId: string; // ID пользователя.
  articleId: string; // ID статьи.
  rate: number; //  Количество звезд (оценка).
  feedback?: string; //Отзыв (необязательно).
}

/**
 * API для взаимодействия с рейтингами статей.
 */
const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Получение рейтинга статьи.
     * @param {GetArticleRatingArg} arg - Аргументы для запроса.
     * @returns {object} - Конфигурация запроса.
     */
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({ userId, articleId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId,
        },
      }),
    }),
    /**
     * Оценка статьи.
     * @param {RateArticleArg} arg - Аргументы для запроса.
     * @returns {object} - Конфигурация запроса.
     */
    rateArticle: build.mutation<void, RateArticleArg>({
      query: (arg) => ({
        url: '/article-ratings',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
});

/**
 * Хук для получения рейтинга статьи.
 */
export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;

/**
 * Хук для оценки статьи.
 */
export const useRateArticle = articleRatingApi.useRateArticleMutation;

// import { useGetArticleRating, useRateArticle } from '';
// const { data: ratingData } = useGetArticleRating({ userId: '123', articleId: '456' });
// const [rateArticle] = useRateArticle();
// rateArticle({ userId: '123', articleId: '456', rate: 5, feedback: 'Great article!' });
