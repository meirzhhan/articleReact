import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../types/jsonSettings';

const defaultJson: JsonSettings = {};

/**
 * Селектор и хук для получения JSON-настроек пользователя из состояния.
 *
 * @param {StateSchema} state - Глобальное состояние приложения.
 * @returns {JsonSettings} - Настройки JSON пользователя или настройки по умолчанию, если данные отсутствуют.
 */
export const [useJsonSettings, getJsonSettings] = buildSelector(
  (state) => state.user?.authData?.jsonSettings ?? defaultJson,
);
