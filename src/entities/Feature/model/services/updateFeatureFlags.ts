import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../../api/featureFlagsApi';
import { getAllFeatureFLags } from './setGetFeatures';

interface updateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

/**
 * Асинхронный thunk для обновления флагов фич пользователя.
 * Отправляет запрос на обновление флагов фич на bd и перезагружает страницу после успешного выполнения.
 *
 * @param {string} userId - ID пользователя, для которого нужно обновить флаги.
 * @param {Partial<FeatureFlags>} newFeatures - Новые флаги фич для обновления.
 * @param {ThunkConfig<string>} thunkApi - Конфигурация thunk, включая методы `rejectWithValue` и `dispatch`.
 * @returns {Promise<void>} Возвращает `undefined` при успешном выполнении.
 * @throws {string} Возвращает ошибку при неудаче.
 */

export const updateFeatureFlag = createAsyncThunk<
  void, // Тип возвращаемого значения
  updateFeatureFlagOptions, // Тип параметров
  ThunkConfig<string> // Тип конфигурации thunk
>(
  'features/updateFeatureFlagOptions',
  async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      await dispatch(
        // RTK => featureFlagsApi. запроса для обновления флагов фич
        updateFeatureFlagsMutation({
          userId,
          features: {
            ...getAllFeatureFLags(),
            ...newFeatures,
          },
        }),
      );

      // Перезагрузка страницы после успешного выполнения
      window.location.reload();

      return undefined;
    } catch (e) {
      // console.log(e); derscanner fix
      return rejectWithValue('');
    }
  },
);
