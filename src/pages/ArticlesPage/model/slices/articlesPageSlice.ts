import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

// Нормализация entity adapter
const articlesAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
});

// export const getArticles = articlesAdapter.getSelectors<StateSchema>(
//   (state) => state.articlesPage || articlesAdapter.getInitialState(),
// ); old

const SelectArticlesPageState = (state: StateSchema) => state.articlesPage;

const selectAllArticles = createSelector(
  [SelectArticlesPageState],
  (articlePageState) =>
    articlePageState
      ? articlePageState.ids.map((id) => articlePageState.entities[id])
      : [],
);

export const getArticles = {
  selectAll: selectAllArticles,
};

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
    _initiated: false,
  }),

  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView;

      state.view = view || ArticleView.SMALL;
      state.limit = view === ArticleView.BIG ? 4 : 9;
      state._initiated = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          articlesAdapter.addMany(state, action.payload);
          state.hasMore = action.payload.length > 0;
        },
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer, actions: articlePageActions } =
  articlesPageSlice;
