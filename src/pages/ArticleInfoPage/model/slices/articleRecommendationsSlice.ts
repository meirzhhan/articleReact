import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

import { ArticlePageRecommendationsSchema } from '../types/articlePageRecommendationsSchema';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

// Адаптер для нормализации состояния рекомендаций
const recommendationsAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
});

// Селектор для получения состояния рекомендаций статей.
const selectArticleRecommendationsState = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations;

/**
 * Селектор для получения всех рекомендаций статей.
 * @param {StateSchema} state - Общее состояние приложения.
 * @returns {Article[]} - Массив всех рекомендаций статей.
 */
const selectAllRecommendations = createSelector(
  [selectArticleRecommendationsState],
  (articleRecommendationsState) =>
    articleRecommendationsState
      ? articleRecommendationsState.ids.map(
          (id) => articleRecommendationsState.entities[id],
        )
      : [],
);

// Объект селекторов для получения рекомендаций статей.
export const getArticleRecommendations = {
  selectAll: selectAllRecommendations,
};

/**
 * Slice для управления состоянием рекомендаций на странице деталей статьи.
 */

const articleRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendationsSlice',
  initialState:
    recommendationsAdapter.getInitialState<ArticlePageRecommendationsSchema>({
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
    }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      /**
       * Обработчик состояния при успешной загрузке рекомендаций статей.
       * Устанавливает `isLoading` в `false` и добавляет загруженные рекомендации в состояние.
       */
      .addCase(
        fetchArticleRecommendations.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          recommendationsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleRecommendationsSliceReducer } =
  articleRecommendationsSlice;
