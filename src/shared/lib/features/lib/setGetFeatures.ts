import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/consts/localStorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatures: FeatureFlags = {
  isAppRedesigned:
    localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

// enable features don't change in the session
let featureFlags: FeatureFlags = {
  ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) featureFlags = newFeatureFlags;
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag] ?? true;
}

export function getAllFeatureFLags() {
  return featureFlags;
}
