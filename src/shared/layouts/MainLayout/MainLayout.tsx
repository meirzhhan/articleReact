import { ReactElement, memo } from 'react';

import { useClassName } from '@/shared/lib/hooks/useClassName';
import cl from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
  const { className, header, content, sidebar, toolbar } = props;

  return (
    <div className={useClassName(cl.Main, {}, [className])}>
      <div className={cl.Main__content}>{content}</div>
      <div className={cl.Main__sidebar}>{sidebar}</div>
      <div className={cl.Main__rightbar}>
        <div className={cl.header}>{header}</div>
        <div className={cl.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
