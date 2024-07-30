import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFLags } from './../lib/setGetFeatures';

interface updateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

// асинхронный thunk для обновления флага фич
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
        // RTK => featureFlagsApi
        updateFeatureFlagsMutation({
          userId,
          features: {
            ...getAllFeatureFLags(),
            ...newFeatures,
          },
        }),
      );

      window.location.reload();

      return undefined;
    } catch (e) {
      console.log(e);
      return rejectWithValue('');
    }
  },
);
