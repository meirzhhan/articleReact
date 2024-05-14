import {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from '@reduxjs/toolkit';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { loginSchema } from 'features/AuthByUsername';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // Асинхронные reducer
  loginForm?: loginSchema;
}

export type StateSchemaKey = keyof StateSchema; // ['counter', 'user', ...]

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: Reducer<StateSchema, UnknownAction>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
