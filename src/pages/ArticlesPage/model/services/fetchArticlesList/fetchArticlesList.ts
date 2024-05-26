import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[], // return value
  FetchArticlesListProps, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('articlesPage/fetchArticlesList', async (props, ThunkApi) => {
  const { extra, rejectWithValue, getState } = ThunkApi;
  const { page = 1 } = props;
  const limit = getArticlesPageLimit(getState());

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
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
