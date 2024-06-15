// RTK query TODO: comments
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
  reducerPath: 'api', // Reducer path for the API
  baseQuery: fetchBaseQuery({
    baseUrl: __API__, // Base URL for the API
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''; // Get token from local storage
      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),

  endpoints: (_) => ({}),
});
