import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { useClassName, Mods } from '@/shared/lib/hooks/useClassName';
import cl from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between'; // Варианты выравнивания по горизонтали
export type FlexAlign = 'start' | 'center' | 'end'; // Варианты выравнивания по вертикали.
export type FlexDirection = 'row' | 'column'; // Варианты направления флекс-контейнера.
export type FlexWrap = 'nowrap' | 'wrap'; // Варианты обтекания флекс-контейнера.
export type FlexGap = '4' | '8' | '16' | '24' | '32'; // Варианты отступов между элементами.

const justifyClasses: Record<FlexJustify, string> = {
  start: cl.justifyStart,
  center: cl.justifyCenter,
  end: cl.justifyEnd,
  between: cl.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cl.alignStart,
  center: cl.alignCenter,
  end: cl.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cl.directionRow,
  column: cl.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: cl.gap4,
  8: cl.gap8,
  16: cl.gap16,
  24: cl.gap24,
  32: cl.gap32,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  wrap?: FlexWrap;
  gap?: FlexGap;
  max?: boolean;
}

/**
 * Компонент Flex используется для создания флекс-контейнера с настраиваемыми стилями.
 *
 * @param {FlexProps} props - Пропсы компонента Flex.
 * @returns {JSX.Element} - Возвращает флекс-контейнер с дочерними элементами.
 */

export const Flex = (props: FlexProps): JSX.Element => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    wrap = 'nowrap',
    gap,
    max,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    cl[wrap],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    [cl.max]: max,
  };

  return (
    <div className={useClassName(cl.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
