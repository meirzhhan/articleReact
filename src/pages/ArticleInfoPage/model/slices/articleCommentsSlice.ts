import {
  EntityAdapter,
  PayloadAction,
  Slice,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { CommentType } from '@/entities/Comment';

import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleCommentsSchema } from '../types/articleCommentsSchema';

/**
 * Адаптер для нормализации комментариев.
 * @type {EntityAdapter<CommentType>}
 */
const commentsAdapter: EntityAdapter<CommentType, string> = createEntityAdapter(
  {
    selectId: (comment: CommentType) => comment.id,
  },
);

/**
 * Селектор состояния комментариев статьи.
 */
const selectArticleCommentsState = (state: StateSchema) =>
  state.articleDetailsPage?.comments;

/**
 * Селектор для получения всех комментариев статьи.
 * @param {StateSchema} state - Состояние хранилища.
 * @returns {CommentType[]} - Массив всех комментариев статьи.
 */
const selectAllComments = createSelector(
  [selectArticleCommentsState],
  (articleCommentsState) =>
    articleCommentsState
      ? articleCommentsState.ids.map((id) => articleCommentsState.entities[id])
      : [],
);

// Селектор для получения всех комментариев статьи.
export const getArticleComments = {
  selectAll: selectAllComments,
};

/**
 * Slice для управления состоянием комментариев статьи.
 * @type {Slice<articleCommentsSchema>}
 */

const articleCommentsSlice: Slice<articleCommentsSchema> = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<articleCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<CommentType[]>) => {
          // Устанавливает `isLoading` в `false` и добавляет загруженные комментарии в состояние.
          state.isLoading = false;
          commentsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Reducer для управления состоянием комментариев статьи.
export const { reducer: articleCommentsSliceReducer } = articleCommentsSlice;
