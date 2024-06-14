import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { articleDetailsPageRecommendationsSchema } from '../types/articleDetailsPageRecommendationsSchema';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

// Нормализация
const recommendationsAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
});

const selectArticleRecommendationsState = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations;

const selectAllRecommendations = createSelector(
  [selectArticleRecommendationsState],
  (articleRecommendationsState) =>
    articleRecommendationsState
      ? articleRecommendationsState.ids.map(
          (id) => articleRecommendationsState.entities[id],
        )
      : [],
);

export const getArticleRecommendations = {
  selectAll: selectAllRecommendations,
};

const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendationsSlice',
  initialState:
    recommendationsAdapter.getInitialState<articleDetailsPageRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
      },
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
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

export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice;
