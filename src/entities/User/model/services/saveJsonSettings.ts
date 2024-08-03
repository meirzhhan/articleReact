import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

/**
 * Сохраняет JSON-настройки пользователя.
 *
 * @async
 * @function
 * @param {JsonSettings} newJsonSettings - Новые JSON-настройки для сохранения.
 * @returns {Promise<JsonSettings>} Возвращает обновленные JSON-настройки при успешном выполнении.
 * @throws {string} Возвращает ошибку при неудаче.
 */

export const saveJsonSettings = createAsyncThunk<
  JsonSettings, // return
  JsonSettings, // param
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

//dispatch(saveJsonSettings({ theme: 'dark', language: 'en' }));
