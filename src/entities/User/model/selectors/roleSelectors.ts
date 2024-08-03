import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';

/**
 * Селектор для получения ролей пользователя из состояния.
 *
 * @param {StateSchema} state - Глобальное состояние приложения.
 * @returns {UserRole[] | undefined} - Массив ролей пользователя или undefined, если нет данных о пользователе.
 */
export const getUserRoles = (state: StateSchema): UserRole[] | undefined =>
  state.user.authData?.roles;

/**
 * Селектор для проверки, является ли пользователь администратором.
 *
 * @param {UserRole[] | undefined} roles - Массив ролей пользователя.
 * @returns {boolean} - true, если пользователь является администратором, иначе false.
 */
export const isUserAdmin = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.ADMIN)),
);

/**
 * Селектор для проверки, является ли пользователь менеджером.
 *
 * @param {UserRole[] | undefined} roles - Массив ролей пользователя.
 * @returns {boolean} - true, если пользователь является менеджером, иначе false.
 */
export const isUserManager = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.MANAGER)),
);
