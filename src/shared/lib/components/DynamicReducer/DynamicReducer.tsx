import { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from '@/app/providers/StoreProvider';

// Каждый ключ соответствует ключу схемы состояния, а значение — это редюсер Redux.
export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicReducerProps {
  reducers: ReducersList; // редюсеры для динамической загрузки.
  removeAfterUnmount?: boolean; // Флаг для удаления редюсера после размонтирования компонента. По умолчанию true.
  children?: ReactNode;
}

/**
 * Компонент, который динамически загружает и выгружает редюсеры Redux.
 *
 * @param {DynamicReducerProps} props - Свойства для этого компонента.
 * @returns {JSX.Element} - Отображаемый компонент обертка.
 */

export const DynamicReducer = (props: DynamicReducerProps): JSX.Element => {
  const { children, reducers, removeAfterUnmount = true } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    // Итерация по предоставленным редьюсерам и добавление их, если они еще не смонтированы
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];

      // добавление, если редюсер еще не смонтирован или не размонтирован
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      // Функция очистки для удаления редюсеров, если removeAfterUnmount равен true
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, _]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@UNMOUNT ${name} reducer` });
        });
      }
    };
  }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

  return <>{children}</>;
};
