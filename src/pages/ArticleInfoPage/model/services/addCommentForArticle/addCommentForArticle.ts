import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { CommentType } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

/**
 * Асинхронный thunk для добавления комментария к статье.
 *
 * @param {string} text - Текст комментария.
 * @param {ThunkApi} ThunkApi - API функции `createAsyncThunk`, содержащее dispatch, extra, rejectWithValue и getState.
 * @returns {Promise<CommentType>} Возвращает объект типа `CommentType` с данными нового комментария.
 * @throws Возвращает строку ошибки, если добавление комментария не удалось.
 */

export const addCommentForArticle = createAsyncThunk<
  CommentType, // return
  string, // param
  ThunkConfig<string> // extra param
>('articleDetails/addCommentForArticle', async (text, ThunkApi) => {
  const { dispatch, extra, rejectWithValue, getState } = ThunkApi;

  const userData = getUserAuthData(getState()); // Данные текущего пользователя.
  const article = getArticleDetailsData(getState()); // Данные текущей статьи.

  if (!userData || !text || !article) rejectWithValue('no data');

  try {
    //  POST-запрос для добавления нового комментария. {id, articleID, userId, text}
    const response = await extra.api.post<CommentType>('/comments', {
      articleId: article?.id,
      userId: userData?.id,
      text,
    });

    if (!response.data) throw new Error();

    // Dispatch action-а для обновления комментариев статьи
    dispatch(fetchCommentsByArticleId(article?.id));

    return response.data;
  } catch (e) {
    // console.log(e); derscanner fix
    return rejectWithValue('error');
  }
});
