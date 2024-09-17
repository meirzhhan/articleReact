import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';
import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Асинхронный Thunk для получения статьи по ID.
 * @param {string | undefined} articleId - ID статьи.
 * @returns {Promise<Article>} Данные статьи.
 */

export const fetchArticleById = createAsyncThunk<
  Article, // возвращаемое значение
  string | undefined, // входное значение
  ThunkConfig<string> // extra, state и <rejectValue>
>('articleDetails/fetchArticleById', async (articleId, ThunkApi) => {
  const { extra, rejectWithValue } = ThunkApi;

  try {
    // Запрос к API для получения статьи
    const response = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: {
        _expand: 'user', // Расширение данных пользователя
      },
    });

    if (!response.data || !articleId) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    // console.log(e); derscanner fix
    return rejectWithValue('error');
  }
});
