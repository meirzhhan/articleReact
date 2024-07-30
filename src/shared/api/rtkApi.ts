// RTK query TODO: comments
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';

// Определение базового URL и ожидаемых эндпоинтов
export const rtkApi = createApi({
  reducerPath: 'api', // Путь для редюсера API
  baseQuery: fetchBaseQuery({
    baseUrl: __API__, // Базовый URL для API
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''; // Получение токена из localStorage
      if (token) {
        headers.set('Authorization', token); // Установка заголовка Authorization с токеном
      }

      return headers;
    },
  }),

  endpoints: () => ({}), // эндпоинты
});
