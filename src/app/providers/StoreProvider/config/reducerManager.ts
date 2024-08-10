import {
  Reducer,
  ReducersMapObject,
  UnknownAction,
  combineReducers,
} from '@reduxjs/toolkit';

import {
  MountedReducers,
  ReducerManager,
  StateSchema,
  StateSchemaKey,
} from './StateSchema';

/**
 * Функция для создания менеджера редюсеров.
 *
 * Менеджер редюсеров динамически добавляет и удаляет редюсеры в Redux store
 * @param {ReducersMapObject<StateSchema>} initialReducers - Начальные редюсеры, которые будут использованы при инициализации.
 *
 * @returns {ReducerManager} Менеджер редюсеров, предоставляющий методы для управления редюсерами.
 */

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  // Комбинированный редюсер, который включает все редюсеры из объекта reducers.
  let combinedReducer = combineReducers(reducers);

  // Массив ключей редюсеров, которые нужно удалить.
  let keysToRemove: StateSchemaKey[] = [];

  const mountedReducers: MountedReducers = {};

  return {
    // Возвращает reducer-ы
    getReducerMap: () => reducers,
    // Возвращает объект смонтированных редюсеров, где ключ указывает на смонтированный редюсер.
    getMountedReducers: () => mountedReducers,
    // Основной редюсер, который используется в Redux store. При наличии ключей редюсеров, которые нужно удалить, они удаляются перед выполнением редюсера.
    reduce: (state: StateSchema, action: UnknownAction) => {
      if (keysToRemove.length > 0) {
        // Удаление ключей редюсеров из состояния
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }
      return combinedReducer(state, action); // Возвращает reducer без лишних ключей
    },

    /**
     * Добавляет новый редюсер в карту редюсеров.
     *
     * @param {StateSchemaKey} key - Ключ, под которым будет храниться редюсер.
     * @param {Reducer} reducer - Редюсер, который будет добавлен.
     */
    add: (key: StateSchemaKey, reducer: Reducer) => {
      // Добавляет reducer

      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;

      mountedReducers[key] = true;

      combinedReducer = combineReducers(reducers);
    },

    /**
     * Удаляет редюсер из карты редюсеров.
     * Ключ добавляется в массив keysToRemove, а редюсер удаляется из карты редюсеров.
     *
     * @param {StateSchemaKey} key - Ключ редюсера, который нужно удалить.
     */
    remove: (key: StateSchemaKey) => {
      // добавляет ключ в массив и удаляет reducer
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      keysToRemove.push(key);

      mountedReducers[key] = false;

      combinedReducer = combineReducers(reducers);
    },
  };
}
