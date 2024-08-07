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

// Функция для создания менеджера редюсеров
export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  // Массив ключей редюсеров, которые нужно удалить
  let keysToRemove: StateSchemaKey[] = [];

  const mountedReducers: MountedReducers = {};

  return {
    getReducerMap: () => reducers, // Возвращает reducer-ы
    getMountedReducers: () => mountedReducers,
    // @ts-expect-error next
    reduce: (state: StateSchema, action: UnknownAction) => {
      if (keysToRemove.length > 0) {
        // Ключи Reducer-а удаляются
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }
      // @ts-expect-error next
      return combinedReducer(state, action); // Возвращает reducer без лишних ключей
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      // Добавляет reducer

      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;

      mountedReducers[key] = true;

      combinedReducer = combineReducers(reducers);
    },

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
