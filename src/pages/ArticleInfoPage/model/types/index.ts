import { articleCommentsSchema } from './articleCommentsSchema';
import { articlePageRecommendationsSchema } from './articlePageRecommendationsSchema';

export interface ArticleDetailsPageSchema {
  comments: articleCommentsSchema;
  recommendations: articlePageRecommendationsSchema;
}
