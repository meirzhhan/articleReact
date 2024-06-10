// RTK query TODO
import { rtkApi } from 'shared/api/rtkApi';

/**
 * Recommendations API endpoints
 */
const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Get article recommendations list endpoint
     *
     * @param limit Limit parameter for the query
     * @returns Query object for the endpoint
     */
    getArticleRecommendationsList: build.query({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),

    // PUT example
    // createArticleRecommendationsList: build.mutation({
    //   query: (limit) => ({
    //     url: '/articles',
    //     params: {
    //       _limit: limit,
    //     },
    //     method: 'PUT',
    //   }),
    // }),
  }),
});

/**
 * Hook for getting article recommendations list
 */
export const useArticleRecommendationsList =
  recommendationsApi.useGetArticleRecommendationsListQuery; // hook generated by RTK query
// export const useCreateRecommendation =
//   recommendationsApi.useCreateArticleRecommendationsListMutation;
