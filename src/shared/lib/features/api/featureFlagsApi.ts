// RTK query TODO: comments
import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagOptions {
  userId: string;
  features: Partial<FeatureFlags>;
}

const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    // 1 - return, 2 - input
    updateFeatureFlag: build.mutation<void, UpdateFeatureFlagOptions>({
      query: ({ userId, features }) => ({
        url: `/users/${userId}`,
        method: 'PATCH', // Puts only 1 key (feature)
        body: {
          features,
        },
      }),
    }),
  }),
});

export const updateFeatureFlagsMutation =
  featureFlagsApi.endpoints.updateFeatureFlag.initiate;
