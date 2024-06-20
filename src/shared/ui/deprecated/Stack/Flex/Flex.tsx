import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cl from './Flex.module.scss';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

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
  32: cl.gap32,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify; // justify-content
  align?: FlexAlign; // align-items
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

/**
 * new UI kit added
 * @deprecated
 */

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    max,
  } = props;

  const mods: Mods = {
    [cl.max]: max,
  };

  const classes = [
    className,
    justifyClasses[justify], // key for object
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  return <div className={classNames(cl.Flex, mods, classes)}>{children}</div>;
};
