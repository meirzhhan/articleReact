import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from '@/entities/Article';

import { SortOrder } from '@/shared/types/sort';

import { getArticlesPageInitiated } from '../../selectors/articlesPageSelectors';
import { articlePageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

/**
 * Асинхронный thunk для инициализации страницы статей.
 * @param {URLSearchParams} searchParams - Параметры поиска из URL.
 * @param {ThunkApi} ThunkApi - Объект ThunkApi, содержащий extra.
 * @returns {Promise<void>} - Promise, который выполняется при успешной инициализации страницы.
 */

export const initArticlesPage = createAsyncThunk<
  void, // Возвращаемое значение
  URLSearchParams, // Входное значение
  ThunkConfig<string> // extra параметры
>('articlesPage/initArticlesPage', async (searchParams, ThunkApi) => {
  const { getState, dispatch } = ThunkApi;

  const initiated = getArticlesPageInitiated(getState());

  if (!initiated) {
    // Получение параметров из URL
    const orderFromUrl = searchParams.get('order') as SortOrder;
    const sortFromUrl = searchParams.get('sort') as ArticleSortField;
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type') as ArticleType;

    // Dispatch параметров, если существуют
    if (orderFromUrl) dispatch(articlePageActions.setOrder(orderFromUrl));
    if (sortFromUrl) dispatch(articlePageActions.setSort(sortFromUrl));
    if (searchFromUrl) dispatch(articlePageActions.setSearch(searchFromUrl));
    if (typeFromUrl) dispatch(articlePageActions.setType(typeFromUrl));

    dispatch(articlePageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
