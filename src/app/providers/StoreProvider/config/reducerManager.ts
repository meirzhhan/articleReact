import {
  Reducer,
  ReducersMapObject,
  UnknownAction,
  combineReducers,
} from '@reduxjs/toolkit';
import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  // Удаление reducer-ов, пример => loginForm
  let keysToRemove: StateSchemaKey[] = [];

  return {
    getReducerMap: () => reducers, // Возвращает reducer-ы
    reduce: (state: StateSchema, action: UnknownAction) => {
      if (keysToRemove.length > 0) {
        // Ключи Reducer-а удаляются
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }

      return combinedReducer(state, action); // Возвращает reducer без лишних ключей
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      // Добавляет reducer

      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StateSchemaKey) => {
      // добавляет ключ в массив и удаляет reducer
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
