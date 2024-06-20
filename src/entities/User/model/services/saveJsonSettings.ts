// TODO: Comment
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings, // return value
  JsonSettings, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('user/saveJsonSettings', async (newJsonSettings, ThunkApi) => {
  const { rejectWithValue, getState, dispatch } = ThunkApi;
  const userData = getUserAuthData(getState());
  const currentSettings = getJsonSettings(getState());

  if (!userData) return rejectWithValue('');

  try {
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings,
        },
      }),
    ).unwrap();

    if (!response.jsonSettings) return rejectWithValue('');

    return response.jsonSettings;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
