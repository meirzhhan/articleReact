import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';

/**
 * Асинхронный thunk для получения рекомендаций статей.
 *
 * @param { void } не принимает ничего
 * @param {ThunkApi} ThunkApi - API функции `createAsyncThunk`, содержащее dispatch, extra, rejectWithValue и getState.
 * @returns {Promise<Article[]>} Возвращает массив объектов типа `Article` с данными рекомендованных статей.
 * @throws Возвращает строку ошибки, если получение рекомендаций не удалось.
 */

export const fetchArticleRecommendations = createAsyncThunk<
  Article[], // return
  void, // param
  ThunkConfig<string> // extra param
>('articleDetailsPage/fetchArticleRecommendations', async (_, ThunkApi) => {
  const { extra, rejectWithValue } = ThunkApi;

  try {
    //  GET-запрос для получения статьей по лимиту.
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _limit: 4,
      },
    });

    if (!response.data) throw new Error();

    return response.data;
  } catch (e) {
    // console.log(e); derscanner fix
    return rejectWithValue('error');
  }
});
