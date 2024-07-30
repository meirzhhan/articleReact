import { useCallback, useRef } from 'react';

/**
 * Хук `useThrottle` используется для ограничения частоты вызова функции.
 *
 * @param callback Функция, которая должна быть ограничена по частоте вызова.
 * @param delay Время в миллисекундах, на которое нужно ограничить частоту вызова функции.
 * @returns Ограниченная по частоте функция, которая вызывает `callback`.
 */

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttleRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;

        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
}
