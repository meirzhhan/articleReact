import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<
  Article[], // return value
  void, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('articlesPage/fetchArticlesList', async (_, ThunkApi) => {
  const { extra, rejectWithValue } = ThunkApi;

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
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
