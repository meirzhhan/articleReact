// RTK query TODO: comments
import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagOptions {
  userId: string;
  features: Partial<FeatureFlags>;
}

// Определение API с помощью RTK Query
const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Определение мутации для обновления флага функции пользователя.
     * Используется для частичного обновления флагов функций у пользователя.
     */
    // Определение мутации для обновления флага. <1 - return => undef, 2 - input => {<FeatureFlags>}>
    updateFeatureFlag: build.mutation<void, UpdateFeatureFlagOptions>({
      // Определение запроса
      query: ({ userId, features }) => ({
        url: `/users/${userId}`, // URL для запроса
        method: 'PATCH', // Метод запроса - PATCH для частичного обновления
        body: {
          features, // Тело запроса, содержащее обновляемые флаги функций
        },
      }),
    }),
  }),
});

export const updateFeatureFlagsMutation =
  featureFlagsApi.endpoints.updateFeatureFlag.initiate;
