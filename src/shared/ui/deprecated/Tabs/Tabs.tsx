import { classNames } from '@/shared/lib/classNames/classNames';
import { ReactNode, memo, useCallback } from 'react';
import cl from './Tabs.module.scss';
import { Card, CardTheme } from '../Card';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

/**
 * new UI kit added
 * @deprecated
 */

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick } = props;

  const clickHandle = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick],
  );

  return (
    <div className={classNames(cl.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cl.tab}
          key={tab.value}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
