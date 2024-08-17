export interface FeatureFlags {
  isProfileEditEnabled?: boolean;
  isAddCommentEnabled?: boolean;
  isEditLoginEnabled?: boolean;
  isEditAvatarEnabled?: boolean;
}

export interface FeatureProps {
  featureKey: keyof FeatureFlags;
  featureLabel: string;
  readonly?: boolean;
}
