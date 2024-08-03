import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

/**
 * Конфигурация API уведомлений с использованием RTK Query.
 */
const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    // Запрос для получения списка уведомлений.
    getNotifications: build.query<Notification[], null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
  }),
});

/**
 * Хук для использования запроса получения уведомлений.
 */
export const useNotifications = notificationApi.useGetNotificationsQuery;
