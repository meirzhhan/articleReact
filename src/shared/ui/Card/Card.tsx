import { HTMLAttributes, ReactNode, memo } from 'react';

import { customCl } from '@/shared/lib/hooks/useClassName';

import cl from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light' | 'transparent'; // Варианты оформления карточки
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'default' | 'partial';
export type FlexColumnGap = '0' | '4' | '8' | '16' | '32';
export type FlexRowGap = '0' | '4' | '8' | '16' | '32';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
  columnGap?: FlexColumnGap;
  rowGap?: FlexRowGap;
  cursorPointer?: boolean;
  headersStyle?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'padding_0',
  '8': 'padding_8',
  '16': 'padding_16',
  '24': 'padding_24',
};

const mapFlexColumnGapToClass: Record<FlexColumnGap, string> = {
  '0': '',
  '4': 'column_gap_4',
  '8': 'column_gap_8',
  '16': 'column_gap_16',
  '32': 'column_gap_32',
};

const mapFlexRowGapToClass: Record<FlexRowGap, string> = {
  '0': '',
  '4': 'row_gap_4',
  '8': 'row_gap_8',
  '16': 'row_gap_16',
  '32': 'row_gap_32',
};

/**
 * Компонент `Card` отображает карточку с возможностью настройки стилей и содержимого.
 *
 * @param {CardProps} props - Пропсы компонента.
 * @returns {JSX.Element} - Рендерит карточку с заданными стилями и содержимым.
 */

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variant = 'normal',
    max,
    padding = '8',
    border = 'normal',
    columnGap = '0',
    cursorPointer,
    rowGap = '0',
    headersStyle: headersBorder,
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];
  const columnGapClass = mapFlexColumnGapToClass[columnGap];
  const rowGapClass = mapFlexRowGapToClass[rowGap];

  return (
    <div
      className={customCl(
        cl.Card,
        {
          [cl.max]: max,
          [cl.cursor]: cursorPointer,
          [cl.header]: headersBorder,
        },
        [
          className,
          cl[variant],
          cl[paddingClass],
          cl[border],
          cl[columnGapClass],
          cl[rowGapClass],
        ],
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
});
