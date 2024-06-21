import { classNames } from '@/shared/lib/classNames/classNames';
import { ReactElement, memo } from 'react';
import cl from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content?: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const { className, left, content, right } = props;

  return (
    <div className={classNames(cl.MainLayout, {}, [className])}>
      {right && <div className={cl.left}>{left}</div>}
      <div className={cl.content}>{content}</div>
      {left && <div className={cl.right}>{right}</div>}
    </div>
  );
});
