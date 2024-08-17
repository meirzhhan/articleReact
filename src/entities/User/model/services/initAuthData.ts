import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';

import { getUserByIdQuery } from '../../api/userApi';
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
    const response = await dispatch(getUserByIdQuery(userId)).unwrap();

    return response;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
