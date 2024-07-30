import { ReactNode, memo, useCallback } from 'react';

import { useClassName } from '@/shared/lib/hooks/useClassName';

import { Flex, FlexDirection } from '../Stack/Flex/Flex';
import { Card } from '../Card';
import cl from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

/**
 * Свойства для компонента Tabs.
 * @typedef {Object} TabsProps
 * @property {string} [className] - Дополнительный className для компонента.
 * @property {TabItem[]} tabs - Массив объектов вкладок.
 * @property {string} value - Текущее значение выбранной вкладки.
 * @property {function(TabItem): void} onTabClick - Функция, вызываемая при клике на вкладку.
 * @property {FlexDirection} [direction='row'] - Направление размещения вкладок.
 */

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

/**
 * Компонент Tabs отображает набор вкладок, позволяющих пользователю переключаться между различными секциями.
 *
 * @param {TabsProps} props - Свойства для компонента.
 * @returns {JSX.Element} Отрендеренный компонент.
 */

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const clickHandle = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      gap="8"
      align="start"
      className={useClassName(cl.Tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;

        return (
          <Card
            variant={isSelected ? 'light' : 'normal'}
            className={useClassName(cl.tab, { [cl.selected]: isSelected }, [])}
            key={tab.value}
            onClick={clickHandle(tab)}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
