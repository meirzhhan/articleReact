import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

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

export const Flex = (props: FlexProps) => {
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
    <div className={classNames(cl.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
