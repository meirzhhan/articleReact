import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CommentType } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  CommentType[], // return value
  string | undefined, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('articleDetails/fetchCommentsByArticleId', async (articleId, ThunkApi) => {
  const { extra, rejectWithValue } = ThunkApi;

  if (!articleId) rejectWithValue('error');

  try {
    const response = await extra.api.get<CommentType[]>('/comments', {
      params: {
        articleId,
        _expand: 'user',
      },
    }); // Ищет id привязанный к посту

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (_) {
    return rejectWithValue('error');
  }
});
