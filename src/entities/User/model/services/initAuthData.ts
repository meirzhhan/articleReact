import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  USER_LOCALSTORAGE_KEY,
} from '@/shared/consts/localStorage';

import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';

/**
 * Инициализирует данные аутентификации пользователя.
 *
 * @async @function
 * @param {void} - Функция не принимает аргументы.
 * @returns {Promise<User>} Возвращает объект пользователя при успешном выполнении.
 * @throws {string} Возвращает ошибку при неудаче.
 */

export const initAuthData = createAsyncThunk<
  User, // return
  void, // param
  ThunkConfig<string> // extra, state and <rejectValue>
>('user/initAuthData', async (_, ThunkApi) => {
  const { rejectWithValue, dispatch } = ThunkApi;

  const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (!userId) return rejectWithValue('');

  try {
    const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

    // localStorage.setItem(
    //   LOCAL_STORAGE_LAST_DESIGN_KEY,
    //   // response.features?.isAppRedesigned ? 'new' : 'old', // FIXME: Remove
    // );

    return response;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
