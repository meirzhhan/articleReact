import { HTMLAttributes, ReactNode, memo } from 'react';

import { useClassName } from '@/shared/lib/hooks/useClassName';

import cl from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light'; // Варианты оформления карточки
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'default' | 'partial';
export type ColumnGap = '0' | '8' | '16';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
  columnGap?: ColumnGap;
  //
  cursorPointer?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'padding_0',
  '8': 'padding_8',
  '16': 'padding_16',
  '24': 'padding_24',
};

const mapColumnGapToClass: Record<ColumnGap, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
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
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];
  const columnGapClass = mapColumnGapToClass[columnGap];

  return (
    <div
      className={useClassName(
        cl.Card,
        { [cl.max]: max, [cl.cursor]: cursorPointer },
        [
          className,
          cl[variant],
          cl[paddingClass],
          cl[border],
          cl[columnGapClass],
        ],
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
});
