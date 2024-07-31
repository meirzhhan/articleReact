import { User } from '@/entities/User';

import { ArticleBlockType, ArticleType } from '../consts/articleConsts';

/**
 * Базовый интерфейс для всех типов блоков статьи.
 */
export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

/**
 * Интерфейс для блока кода статьи.
 */
export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

/**
 * Интерфейс для блока изображения статьи.
 */
export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

/**
 * Интерфейс для текстового блока статьи.
 */

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: string[];
  title?: string;
}

/**
 * Тип для всех возможных блоков статьи.
 */
export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleImageBlock
  | ArticleTextBlock;

/**
 * Интерфейс для статьи.
 */
export interface Article {
  id: string;
  title: string;
  user: User;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
