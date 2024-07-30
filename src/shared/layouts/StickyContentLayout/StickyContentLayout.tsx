import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const { className, content, right } = props;

  return (
    <div className={classNames(cl.MainLayout, {}, [className])}>
      <div className={cl.content}>{content}</div>
      {right && <div className={cl.right}>{right}</div>}
    </div>
  );
});
