import { EntityState } from '@reduxjs/toolkit';
import { CommentType } from '@/entities/Comment';

export interface ArticleDetailsCommentsSchema
  extends EntityState<CommentType, string> {
  isLoading?: boolean;
  error?: string;
}
