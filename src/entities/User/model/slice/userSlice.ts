import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { setFeatureFlags } from '@/shared/lib/features';
import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  USER_LOCALSTORAGE_KEY,
} from '@/shared/consts/localStorage';

import { initAuthData } from '../services/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { User, UserSchema } from '../types/user';
import { JsonSettings } from '../types/jsonSettings';

const initialState: UserSchema = {
  _initiated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Устанавливает данные аутентификации пользователя.
     * @param {UserSchema} state - Текущее состояние.
     * @param {PayloadAction<User>} action - Данные аутентификации пользователя.
     */
    setAuthData: (state: UserSchema, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
      localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);
      // localStorage.setItem(
      //   LOCAL_STORAGE_LAST_DESIGN_KEY,
      //   action.payload.features?.isAppRedesigned ? 'new' : 'old',
      // );
    },

    /**
     * Осуществляет выход пользователя из системы.
     * @param {UserSchema} state - Текущее состояние.
     */
    logout: (state: UserSchema) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
          console.log(1);
        }
      },
    );
    builder
      .addCase(
        initAuthData.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.authData = payload;
          setFeatureFlags(payload.features);
          state._initiated = true;
        },
      )
      .addCase(initAuthData.rejected, (state) => {
        state._initiated = true;
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
