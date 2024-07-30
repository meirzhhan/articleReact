import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
  Article,
  ArticleView,
  ArticleSortField,
  ArticleType,
} from '@/entities/Article';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';
import { SortOrder } from '@/shared/types/sort';

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
    limit: 9,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL,
  }),

  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
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
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) articlesAdapter.removeAll(state); // If search params change
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length >= state.limit;

        if (action.meta.arg.replace)
          // If search params change
          articlesAdapter.setAll(state, action.payload);
        else articlesAdapter.addMany(state, action.payload);
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer, actions: articlePageActions } =
  articlesPageSlice;
