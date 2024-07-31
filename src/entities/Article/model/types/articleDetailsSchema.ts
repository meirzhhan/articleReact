import { Article } from './article';

/**
 * Интерфейс для схемы деталей статьи.
 */
export interface ArticleDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: Article;
}
