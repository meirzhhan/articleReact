import { EntityState } from '@reduxjs/toolkit';
import { CommentType } from '@/entities/Comment';

/**
 * Схема состояния для комментариев на странице деталей статьи.
 * Расширяет интерфейс `EntityState` с типом `CommentType` и строковыми идентификаторами.
 */
export interface ArticleCommentsSchema
  extends EntityState<CommentType, string> {
  isLoading?: boolean;
  error?: string;
}
