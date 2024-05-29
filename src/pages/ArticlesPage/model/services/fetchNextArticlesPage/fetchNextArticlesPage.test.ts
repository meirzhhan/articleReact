import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlePage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ArticleView } from 'entities/Article';
import { ArticleSortField } from 'entities/Article/model/types/article';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        view: ArticleView.BIG,
        _initiated: false,
        order: 'asc',
        search: '',
        sort: ArticleSortField.TITLE,
      }, // initialState
    }); // mock AsyncThunk

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(4); // pending, fulfilled, 2 dispatch
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
  });

  test('fetchArticleList should not call (hasMore = false)', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        view: ArticleView.BIG,
        _initiated: false,
        order: 'asc',
        search: '',
        sort: ArticleSortField.TITLE,
      },
    }); // mock AsyncThunk

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2); // pending, fulfilled. without dispatch
    expect(fetchArticlesList).not.toHaveBeenCalled(); // shouldn't called
  });

  test('fetchArticleList should not call (isLoading = true)', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
        view: ArticleView.BIG,
        _initiated: false,
        order: 'asc',
        search: '',
        sort: ArticleSortField.TITLE,
      }, // initialState
    }); // mock AsyncThunk

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2); // pending, fulfilled. without dispatch
    expect(fetchArticlesList).not.toHaveBeenCalled(); // shouldn't called
  });
});
