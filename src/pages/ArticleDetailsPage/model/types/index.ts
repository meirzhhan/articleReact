import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { articleDetailsPageRecommendationsSchema } from './articleDetailsPageRecommendationsSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema;
  recommendations: articleDetailsPageRecommendationsSchema;
}
