import { createSelector } from '@reduxjs/toolkit';

import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

/**
 * Селектор для проверки возможности редактирования статьи текущим пользователем.
 *
 * @returns {boolean} Возвращает `true`, если пользователь может редактировать статью, иначе `false`.
 */

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) false;

    return article?.user.id === user?.id;
  },
);
