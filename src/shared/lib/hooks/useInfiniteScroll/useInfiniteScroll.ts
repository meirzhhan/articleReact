import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef?: MutableRefObject<HTMLElement>;
}

// Функция для бесконечной пагинации. Принимает =>
export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    const wrapperElement = wrapperRef?.current || null; // ссылка на контейнер, если он есть
    const triggerElement = triggerRef.current; // ссылка на элемент-триггер

    let observer: IntersectionObserver | null = null; // переменная для IntersectionObserver

    if (callback) {
      let options = {
        root: wrapperElement, // Контейнер, в котором происходит наблюдение (если задан)
        rootMargin: '0px', // Отступы вокруг корневого элемента
        threshold: 1.0, // Процент видимости элемента, при котором срабатывает callback
      };

      // Инициализация IntersectionObserver
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          // Если элемент видим, вызывается callback
          callback();
        }
      }, options);

      observer.observe(triggerElement);
    }

    // Функция очистки, вызывается при размонтировании компонента
    return () => {
      if (observer && triggerElement) {
        observer.unobserve(triggerElement); // отписка от триггера
      }
    };
  }, [callback, triggerRef, wrapperRef]);
}
