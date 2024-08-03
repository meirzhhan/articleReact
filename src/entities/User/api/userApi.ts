import { rtkApi } from '@/shared/api/rtkApi';

import { User } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';

interface SetJsonSettingsArg {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * Мутация для обновления JSON-настроек пользователя.
     *
     * @param {SetJsonSettingsArg} arg - Аргументы мутации.
     * @param {string} arg.userId - Идентификатор пользователя.
     * @param {JsonSettings} arg.jsonSettings - Обновленные JSON-настройки.
     * @returns {User} - Обновленный объект пользователя.
     */
    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH', // Обновление только одного ключа (jsonSettings)
        body: {
          jsonSettings,
        },
      }),
    }),
    /**
     * Запрос для получения данных пользователя по его идентификатору.
     *
     * @param {string} userId - Идентификатор пользователя.
     * @returns {User} - Объект пользователя с данными.
     */
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

/**
 * Хук для выполнения мутации обновления JSON-настроек пользователя.
 */
export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate;

/**
 * Хук для выполнения запроса получения данных пользователя по идентификатору.
 */
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
