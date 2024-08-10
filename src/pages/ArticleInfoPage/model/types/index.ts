import { ArticleCommentsSchema } from './articleCommentsSchema';
import { ArticlePageRecommendationsSchema } from './articlePageRecommendationsSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleCommentsSchema;
  recommendations: ArticlePageRecommendationsSchema;
}
