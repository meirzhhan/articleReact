import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;

  view: ArticleView;

  // paginate
  page: number;
  limit?: number;
  hasMore: boolean;

  _initiated: boolean;
}
