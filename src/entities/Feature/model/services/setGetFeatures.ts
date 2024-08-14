import { FeatureFlags } from '@/shared/types/featureFlags';

// enable features don't change in the session
let featureFlags: FeatureFlags = {};

/**
 * Устанавливает новые флаги функций.
 *
 * Обновляет глобальное состояние флагов функций. Если новые флаги не переданы, текущее состояние не изменяется.
 * @param {FeatureFlags} [newFeatureFlags] - Новые флаги функций для установки. Если не передан, текущее состояние не изменится.
 */
export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) featureFlags = newFeatureFlags;
}

/**
 * Получает значение указанного флага функции.
 *
 * @param {keyof FeatureFlags} flag - Ключ флага функции, значение которого нужно получить.
 * @returns {boolean} Значение флага функции. Если флаг не установлен, возвращается `true`.
 */
export function getFeatureFlag(flag: keyof FeatureFlags): boolean {
  return featureFlags[flag] ?? true;
}

// Получает все текущие флаги функций.
export function getAllFeatureFLags() {
  return featureFlags;
}
