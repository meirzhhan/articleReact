import { ReactElement } from 'react';

import { getFeatureFlag } from '@/entities/Feature';

import { FeatureFlags } from './../../../types/featureFlags';
interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

// Компонент для переключения children компонента по флагу
export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { on, off, feature } = props;

  // Проверка значения флага функции
  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
};
