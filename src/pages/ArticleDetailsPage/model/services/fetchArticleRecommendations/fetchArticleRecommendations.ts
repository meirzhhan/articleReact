import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
  Article[], // return value
  void, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('articleDetailsPage/fetchArticleRecommendations', async (_, ThunkApi) => {
  const { extra, rejectWithValue } = ThunkApi;

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _limit: 4,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (_) {
    return rejectWithValue('error');
  }
});
