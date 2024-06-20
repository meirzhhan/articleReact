// TODO: Comment
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const initAuthData = createAsyncThunk<
  User, // return value
  void, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('user/initAuthData', async (_, ThunkApi) => {
  const { rejectWithValue, dispatch } = ThunkApi;

  const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (!userId) return rejectWithValue('');

  try {
    const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

    return response;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
