import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

/**
 * Схема состояния для рекомендаций на странице деталей статьи.
 * Расширяет интерфейс `EntityState` с типом `Article` и строковыми идентификаторами.
 */
export interface ArticlePageRecommendationsSchema
  extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;
}
