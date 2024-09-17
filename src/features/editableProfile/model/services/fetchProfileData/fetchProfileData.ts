import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Profile } from '@/entities/Profile';
import { getRouteProfile } from '@/shared/consts/router';

/**
 * Асинхронный thunk для получения данных профиля по ID.
 *
 * @returns {Promise<Profile>} - Promise, который разрешается с данными профиля.
 * @param {string} profileId - Идентификатор профиля, данные которого нужно получить.
 * @param {ThunkConfig<string>} ThunkApi - Конфигурация thunk, предоставляемая Redux.
 */

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, ThunkApi) => {
  const { extra, rejectWithValue } = ThunkApi;

  try {
    // GET-запрос к API для получения данных профиля по заданному идентификатору
    const response = await extra.api.get<Profile>(getRouteProfile(profileId));

    if (!response.data) throw new Error();

    return response.data;
  } catch (e) {
    // console.log(e); derscanner fix
    return rejectWithValue('error');
  }
});
