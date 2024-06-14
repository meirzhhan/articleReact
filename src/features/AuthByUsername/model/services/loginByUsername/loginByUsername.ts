import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import i18n from '@/shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, ThunkApi) => {
  const { dispatch, extra, rejectWithValue } = ThunkApi;

  try {
    // const response = await axios.post<User>(
    //   'http://localhost:8000/login',
    //   authData,
    // );
    const response = await extra.api.post<User>('/login', authData);

    if (!response.data) {
      throw new Error();
    }
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    dispatch(userActions.setAuthData(response.data));
    // extra.navigate('/about');

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'));
  }
});
