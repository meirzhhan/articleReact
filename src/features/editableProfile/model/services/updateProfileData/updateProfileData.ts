import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../../consts/consts';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

/**
 * Асинхронный thunk для обновления данных профиля.
 *
 * 1. Получает текущие данные профиля из состояния.
 * 2. Валидация данных профиля.
 * 3. Если данные профиля валидны, выполняет PUT-запрос для их обновления.
 * 4. В случае успешного обновления возвращает обновленные данные профиля.
 * 5. В случае ошибок валидации или запроса возвращает массив ошибок.
 *
 * @param {void} _ - Параметры не требуются.
 * @param {ThunkConfig<ValidateProfileError[]>} ThunkApi - Конфигурация thunk, предоставляемая Redux.
 * @returns {Promise<Profile>} - Промис, который разрешается с обновленными данными профиля при успешном обновлении.
 * @throws {ValidateProfileError[]} - Возвращает массив ошибок валидации, если данные профиля некорректны.
 */

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, ThunkApi) => {
  const { extra, rejectWithValue, getState } = ThunkApi;

  // Получение текущих введенных данных профиля из состояния
  const formData = getProfileForm(getState()); // useSelector

  // Валидация данных профиля
  const errors = validateProfileData(formData);

  if (errors.length) return rejectWithValue(errors);

  try {
    //  PUT-запрос для обновления данных профиля
    const response = await extra.api.put<Profile>(
      `/profile/${formData?.id}`,
      formData,
    );

    if (!response.data) throw new Error();

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
