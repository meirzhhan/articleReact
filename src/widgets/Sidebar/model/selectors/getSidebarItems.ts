import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/consts/router';
import { SidebarItemsType } from '../types/sidebar';

import MainIcon from '@/shared/assets/icons/homeNew.svg';
import AboutIcon from '@/shared/assets/icons/infoNew.svg';
import ProfileIcon from '@/shared/assets/icons/avatarNew.svg';
import ArticleIcon from '@/shared/assets/icons/articleNew.svg';
import SettingsIcon from '@/shared/assets/icons/kebabNew.svg';

/**
 * Селектор getSidebarItems возвращает список элементов боковой панели навигации.
 * Если пользователь авторизован, добавляются элементы, доступные только авторизованным пользователям.
 *
 * @param {Object} state - Состояние Redux.
 * @returns {SidebarItemsType[]} Список элементов боковой панели.
 */

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemsType[] = [
    {
      path: getRouteMain(),
      Icon: MainIcon,
      text: 'Главная',
    },
    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: 'О сайте',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: ArticleIcon,
        text: 'Статьи',
        authOnly: true,
      },
      {
        path: getRouteSettings(),
        Icon: SettingsIcon,
        text: 'Настройки',
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
});
