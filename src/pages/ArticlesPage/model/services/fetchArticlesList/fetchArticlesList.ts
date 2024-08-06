import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article, ArticleType } from '@/entities/Article';

import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  replace?: boolean;
}

/**
 * Асинхронный thunk для получения списка статей.
 * @param {FetchArticlesListProps} _ - Параметры для замены существующего списка статей.
 * @param {ThunkApi} ThunkApi - Объект ThunkApi, содержащий дополнительные данные, функции и методы для выполнения запроса.
 * @returns {Promise<Article[]>} - Promise, возвращающий массив статей или ошибку.
 */

export const fetchArticlesList = createAsyncThunk<
  Article[], // Тип, возвращаемое функцией
  FetchArticlesListProps, // Входное значение
  ThunkConfig<string> // extra параметры, состояние и значение
>('articlesPage/fetchArticlesList', async (_, ThunkApi) => {
  const { extra, rejectWithValue, getState } = ThunkApi;

  const limit = getArticlesPageLimit(getState());
  const page = getArticlesPageNum(getState());
  const sort = getArticlesPageSort(getState());
  const order = getArticlesPageOrder(getState());
  const search = getArticlesPageSearch(getState());
  const type = getArticlesPageType(getState());

  try {
    // Добавляет параметры запроса в URL
    addQueryParams({ sort, order, search, type });

    // GET-запрос для получения списка статьей с определенными фильтрами
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
