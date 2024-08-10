import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';

import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

/**
 * Компонент `StoreProvider` оборачивает дочерние компоненты в Redux `Provider` и предоставляет доступ к Redux store.
 *
 * @param {StoreProviderProps} props - Свойства, передаваемые в компонент.
 * @param {ReactNode} props.children - Дочерние элементы, которые будут обернуты в `Provider`.
 * @param {DeepPartial<StateSchema>} [props.initialState] - Начальное состояние Redux store.
 * @param {DeepPartial<ReducersMapObject<StateSchema>>} [props.asyncReducers] - Асинхронные редюсеры, которые могут быть добавлены в store.
 *
 * @returns {JSX.Element} Компонент `StoreProvider`, который предоставляет Redux store дочерним компонентам.
 */

export const StoreProvider = (props: StoreProviderProps) => {
  const { initialState, asyncReducers, children } = props;

  // Redux store с начальным состоянием и асинхронными редюсерами
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
  );

  // Оборачивание дочерних компонентов в Redux Provider
  return <Provider store={store}>{children}</Provider>;
};
