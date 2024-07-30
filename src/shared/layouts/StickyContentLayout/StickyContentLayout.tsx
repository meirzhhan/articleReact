import { memo, ReactElement } from 'react';

import { customCl } from '@/shared/lib/classNames/classNames';
import cl from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
  const { className, content, right } = props;

  return (
    <div className={customCl(cl.Sticky, {}, [className])}>
      <div className={cl.Sticky__content}>{content}</div>
      {right && <div className={cl.Sticky__right}>{right}</div>}
    </div>
  );
});
