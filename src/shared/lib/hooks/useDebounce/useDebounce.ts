import { MutableRefObject, useCallback, useRef } from 'react';

// Хук для дэбаунса, принимает callback и delay
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef() as MutableRefObject<any>;

  return useCallback(
    (...args: any[]) => {
      // Если таймер существует, очищает его
      if (timer.current) {
        clearTimeout(timer.current);
      }

      // Установка нового таймера и вызов его после таймера
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },

    [callback, delay],
  );
}
