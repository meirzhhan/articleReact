import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

import i18nForTests from '@/shared/config/i18n/i18nForTests';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

/**
 * Утилита для рендеринга компонента с необходимыми обёртками для тестирования.
 * @param component - Компонент, который нужно отрендерить.
 * @param options - Опции рендеринга, такие как начальный путь, состояние и редюсеры.
 * @returns Результат рендеринга компонента с обёртками.
 */

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  const { route = '/', initialState, asyncReducers } = options;
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  );
}
