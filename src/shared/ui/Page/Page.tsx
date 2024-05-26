import { classNames } from 'shared/lib/classNames/classNames';
import { MutableRefObject, ReactNode, memo, useRef } from 'react';
import cl from './Page.module.scss';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  // Will work with callback
  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef,
  });

  return (
    <section ref={wrapperRef} className={classNames(cl.Page, {}, [className])}>
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
