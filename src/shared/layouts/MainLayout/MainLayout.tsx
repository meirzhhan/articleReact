import { classNames } from '@/shared/lib/classNames/classNames';
import { ReactElement, memo } from 'react';
import cl from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  toolbar: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
  const { className, header, content, sidebar, toolbar } = props;

  return (
    <div className={classNames(cl.MainLayout, {}, [className])}>
      <div className={cl.sidebar}>{sidebar}</div>
      <div className={cl.content}>{content}</div>
      <div className={cl.rightbar}>
        <div className={cl.header}>{header}</div>
        <div className={cl.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
