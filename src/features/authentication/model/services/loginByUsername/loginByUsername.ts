import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User, userActions } from '@/entities/User';

import i18n from '@/shared/config/i18n/i18n';

export interface LoginByUsernameProps {
  username: string;
  password: string;
}

/**
 * Асинхронный thunk для авторизации пользователя по имени пользователя и паролю.
 * @param {LoginByUsernameProps} authData - Данные для авторизации, включающие имя пользователя и пароль.
 * @param {ThunkApi} ThunkApi - Объект, предоставляемый Redux Toolkit для доступа к dispatch, extra и rejectWithValue.
 * @returns {Promise<User>} - Возвращает объект пользователя при успешной авторизации.
 */

export const loginByUsername = createAsyncThunk<
  User, // Тип возвращаемого значения - Object User
  LoginByUsernameProps, // Тип входных данных - Object User
  ThunkConfig<string> // Тип конфигурации thunk - включает extra, state и rejectValue
>('login/loginByUsername', async (authData, ThunkApi) => {
  const { dispatch, extra, rejectWithValue } = ThunkApi;

  try {
    // Отправка POST-запроса на сервер для авторизации пользователя
    const response = await extra.api.post<User>('/login', authData);

    if (!response.data) {
      throw new Error('Серверная ошибка');
    }
    dispatch(userActions.setAuthData(response.data));
    // navigate('/main');

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'));
  }
});

// TEST
// const response = await axios.post<User>(
//   'http://localhost:8000/login',
//   authData,
// );
