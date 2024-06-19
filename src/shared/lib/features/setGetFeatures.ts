import { FeatureFlags } from '@/shared/types/featureFlags';

// enable features don't change in the session
let featureFlags: FeatureFlags;

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) featureFlags = newFeatureFlags;
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag];
}
