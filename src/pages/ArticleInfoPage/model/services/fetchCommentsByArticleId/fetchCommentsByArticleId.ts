import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { CommentType } from '@/entities/Comment';

/**
 * Асинхронный thunk для получения комментариев к статье по её идентификатору.
 *
 * @param {string | undefined} articleId - Идентификатор статьи.
 * @param {ThunkApi} ThunkApi - API функции `createAsyncThunk`, содержащее dispatch, extra, rejectWithValue и getState.
 * @returns {Promise<CommentType[]>} Возвращает массив объектов типа `CommentType` с данными комментариев.
 * @throws Возвращает строку ошибки, если получение комментариев не удалось.
 */

export const fetchCommentsByArticleId = createAsyncThunk<
  CommentType[], // return
  string | undefined, // param
  ThunkConfig<string> // extra param
>('articleDetails/fetchCommentsByArticleId', async (articleId, ThunkApi) => {
  const { extra, rejectWithValue } = ThunkApi;

  if (!articleId) rejectWithValue('error');

  try {
    //  GET-запрос для получения массива комментариев для определенной статьи по ID
    const response = await extra.api.get<CommentType[]>('/comments', {
      params: {
        articleId,
        _expand: 'user',
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
