import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';

// экземпляр Axios с базовым URL
export const $api = axios.create({
  baseURL: __API__,
});

// Добавление интерцептор для запросов
$api.interceptors.request.use((config) => {
  // Проверка наличия заголовков в конфигурации запроса
  if (config.headers) {
    // Добавление заголовка авторизации с токеном из localStorage
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
  }
  return config;
});
