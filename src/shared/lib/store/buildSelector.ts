import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...arg: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

/**
 * Функция `buildSelector` создает хук для использования с `useSelector` и возвращает его вместе с оригинальным селектором.
 *
 * @param selector - Селектор, который принимает состояние и дополнительные аргументы, возвращает значение типа T.
 * @returns Массив, где первый элемент - это хук, а второй элемент - оригинальный селектор.
 */

export function buildSelector<T, Args extends any[]>(
  selector: Selector<T, Args>,
): Result<T, Args> {
  const useSelectorHook: Hook<T, Args> = (...args: Args) => {
    return useSelector((state: StateSchema) => selector(state, ...args));
  };

  return [useSelectorHook, selector];
}
