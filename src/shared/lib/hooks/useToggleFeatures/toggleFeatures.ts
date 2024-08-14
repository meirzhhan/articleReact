import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from '../../../../entities/Feature/model/services/setGetFeatures';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

// Функция для отработки определенных сценариев по флагу
export function toggleFeatures<T>({ name, on, off }: ToggleFeaturesOptions<T>) {
  if (getFeatureFlag(name)) {
    return on();
  }

  return off();
}
