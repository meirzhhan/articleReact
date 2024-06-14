import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[], // return value
  FetchArticlesListProps, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('articlesPage/fetchArticlesList', async (_, ThunkApi) => {
  const { extra, rejectWithValue, getState } = ThunkApi;

  const limit = getArticlesPageLimit(getState());

  const page = getArticlesPageNum(getState());
  const sort = getArticlesPageSort(getState());
  const order = getArticlesPageOrder(getState());
  const search = getArticlesPageSearch(getState());
  const type = getArticlesPageType(getState());

  try {
    addQueryParams({ sort, order, search, type });

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
    }); // Ищет id user привязанный к посту для отрисовки

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (_) {
    return rejectWithValue('error');
  }
});
