import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getUIScroll = (state: StateSchema) => state.ui.scroll;

export const getUIScrollByPath = createSelector(
  getUIScroll, // return whole object
  (_: StateSchema, path: string) => path, // putting path
  (scroll, path) => scroll[path] || 0,
);
