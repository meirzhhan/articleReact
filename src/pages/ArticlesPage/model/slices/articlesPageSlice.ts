import {
  EntityAdapter,
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

import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';
import { SortOrder } from '@/shared/types/sort';

import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

/**
 * Адаптер для нормализации Статьей.
 * @type {EntityAdapter<Article, string>}
 */
const articlesAdapter: EntityAdapter<Article, string> = createEntityAdapter({
  selectId: (article: Article) => article.id,
});

/**
 * Селектор состояния статьей.
 */
const SelectArticlesPageState = (state: StateSchema) => state.articlesPage;

/**
 * Селектор для получения всех статьей.
 * @param {StateSchema} state - Состояние хранилища.
 */
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

/**
 * Slice для управления состоянием страницы статей.
 */
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
    // Устанавливает режим просмотра страницы (Плитка | Список) статей и сохраняет его в localStorage.
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    // Устанавливает текущий номер страницы для нумерации страниц.
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    // asc | desc
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    // date | views | name
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    // Устанавливает тип отображаемых статей (IT | Science, ...).
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    // Инициализация
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

        if (action.meta.arg.replace) articlesAdapter.removeAll(state); // Если параметры поиска меняются, сброс
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasMore = action.payload.length >= state.limit;

        if (action.meta.arg.replace)
          // Если параметры поиска меняются
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
