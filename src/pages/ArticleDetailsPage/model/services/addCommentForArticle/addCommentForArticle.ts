import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CommentType } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetails';
import { fetchCommentsByArticleId } from '../../services//fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  CommentType, // return value
  string, // input value
  ThunkConfig<string> // extra<rejectValue>
>('articleDetails/addCommentForArticle', async (text, ThunkApi) => {
  const { dispatch, extra, rejectWithValue, getState } = ThunkApi;

  const userData = getUserAuthData(getState());
  const article = getArticleDetailsData(getState());

  if (!userData || !text || !article) rejectWithValue('no data');

  try {
    const response = await extra.api.post<CommentType>('/comments', {
      articleId: article?.id,
      userId: userData?.id,
      text,
    });

    if (!response.data) {
      throw new Error();
    }

    dispatch(fetchCommentsByArticleId(article?.id));

    return response.data;
  } catch (_) {
    return rejectWithValue('error');
  }
});
