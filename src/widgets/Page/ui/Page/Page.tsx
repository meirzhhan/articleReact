import {
  MutableRefObject,
  ReactNode,
  UIEvent,
  memo,
  useEffect,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

import { uiActions } from '@/features/UI';
import { getUIScrollByPath } from '@/features/UI/model/selectors/ui';

import { customCl } from '@/shared/lib/hooks/useClassName';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

import cl from './Page.module.scss';
interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

/**
 * Компонент Page - бесконечная прокрутка и сохранение позиции прокрутки, если callback передан
 *
 * @param {PageProps} props - Свойства для компонента.
 * @returns {JSX.Element} Отрендеренный компонент страницы.
 */

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const scrollPosition = useSelector((state: StateSchema) =>
    getUIScrollByPath(state, pathname),
  );

  // Обработка бесконечной прокрутки, работает если callback передан
  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef: undefined,
  });

  // Устанавливает сохраненную позицию прокрутки при загрузке страницы
  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, [scrollPosition]);

  // Обработчик события прокрутки с использованием троттлинга
  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      uiActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      }),
    );
  }, 500);

  return (
    <main
      ref={wrapperRef}
      className={customCl(cl.Page, {}, [className])}
      onScroll={onScroll}
      id={PAGE_ID}
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}
      {onScrollEnd ? <div className={cl.trigger} ref={triggerRef} /> : null}
    </main>
  );
});
