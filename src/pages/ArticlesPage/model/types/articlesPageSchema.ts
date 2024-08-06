import { EntityState } from '@reduxjs/toolkit';

import {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

/**
 * ArticlesPageSchema определяет структуру состояния страницы со статьями.
 * Наследует EntityState от Redux Toolkit для управления состоянием коллекции статей.
 */
export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;

  // Пагинация
  page: number; // Текущая страница.
  limit: number; // Количество статей на странице.
  hasMore: boolean; // Флаг наличия ещё страниц для загрузки.

  // Фильтры
  view: ArticleView; // Вид отображения статей (список или сетка).
  order: SortOrder; // Порядок сортировки статей (возрастающий или убывающий).
  sort: ArticleSortField; // Поле для сортировки статей (по дате, по просмотрам, по названию).
  search: string; // Строка для поиска статей.
  type: ArticleType; // Тип статей  (IT, SCIENCE, ...)

  _initiated: boolean; // Флаг для определения, была ли инициализирована страница.
}
