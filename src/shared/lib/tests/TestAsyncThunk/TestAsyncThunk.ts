import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';

import { StateSchema } from '@/app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

/**
 * Класс для тестирования асинхронных действий Redux (thunks).
 *
 * @template Return - Тип возвращаемого значения асинхронного действия.
 * @template Arg - Тип аргументов асинхронного действия.
 * @template RejectedValue - Тип значения ошибки в случае отклонения.
 */

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>; // Мок для функции dispatch
  getState: () => StateSchema; // Функция для получения состояния
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>; // Создатель действия

  api: jest.MockedFunctionDeep<AxiosStatic>; // Мок для axios
  navigate: jest.MockedFn<any>; // Мок для функции navigate

  /**
   * Конструктор класса.
   *
   * @param actionCreator - Функция для создания асинхронного действия.
   * @param state - Начальное состояние для тестов.
   */

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: Partial<StateSchema>,
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn(); // Инициализация мока для dispatch
    this.getState = jest.fn(() => state as StateSchema); // Инициализация мока для getState

    this.api = mockedAxios; // Использование мок axios
    this.navigate = jest.fn(); // Инициализация мока для navigate
  }

  /**
   * Выполняет асинхронное действие и возвращает результат.
   *
   * @param arg - Аргументы для асинхронного действия.
   * @returns Результат выполнения асинхронного действия.
   */

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    });
    return result;
  }
}
