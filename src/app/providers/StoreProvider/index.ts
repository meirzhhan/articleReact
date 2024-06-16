import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import {
  StateSchema,
  ReduxStoreWithManager,
  ThunkConfig,
  StateSchemaKey,
} from './config/StateSchema';

export { StoreProvider, createReduxStore };

export type {
  StateSchema,
  AppDispatch,
  StateSchemaKey,
  ReduxStoreWithManager,
  ThunkConfig,
};
