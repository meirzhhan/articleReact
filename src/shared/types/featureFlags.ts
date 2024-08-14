export interface FeatureFlags {
  isArticleRatingEnabled?: boolean;
  isProfileEditEnabled?: boolean;
  isAddCommentEnabled?: boolean;
}

export interface FeatureProps {
  featureKey: keyof FeatureFlags;
  featureLabel: string;
}
