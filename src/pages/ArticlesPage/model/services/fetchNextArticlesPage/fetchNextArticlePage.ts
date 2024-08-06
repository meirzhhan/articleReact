import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlePageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

/**
 * Асинхронный thunk для получения следующей порции статей.
 * @param {void} - Не принимает параметров.
 * @returns {Promise<void>} - Promise, который выполняется при успешном получении следующей страницы статей.
 */

export const fetchNextArticlesPage = createAsyncThunk<
  void, // Возвращаемое значение
  void, // Входное значение
  ThunkConfig<string> // extra параметры
>('articlesPage/fetchNextArticlesPage', async (_, ThunkApi) => {
  const { getState, dispatch } = ThunkApi;

  const hasMore = getArticlesPageHasMore(getState());
  const page = getArticlesPageNum(getState());
  const isLoading = getArticlesPageIsLoading(getState());

  /**
   * Проверяет, есть ли еще статьи для загрузки и не идет ли в данный момент загрузка.
   * Устанавливает номер следующей страницы и запрашивает следующую страницу статей
   */
  if (hasMore && !isLoading) {
    dispatch(articlePageActions.setPage(page + 1));
    dispatch(fetchArticlesList({}));
  }
});
