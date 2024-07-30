import { useMemo } from 'react';
import {
  CreateSliceOptions,
  SliceCaseReducers,
  bindActionCreators,
  createSlice,
} from '@reduxjs/toolkit';

import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';

/**
 * Функция `buildSlice` упрощает создание срезов (slices) Redux и предоставляет хук для использования действий (actions).
 *
 * @param options - Параметры для создания среза, включая начальное состояние, редюсеры и имя среза.
 * @returns Объект, содержащий созданный срез и хук для использования действий.
 */

export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);

  const useActions = () => {
    const dispatch = useAppDispatch();

    return useMemo(
      () => bindActionCreators(slice.actions, dispatch),
      [dispatch],
    );
  };

  return {
    ...slice,
    useActions,
  };
}
