import { HTMLAttributes, ReactNode, memo } from 'react';

import { customCl } from '@/shared/lib/hooks/useClassName';

import cl from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light' | 'transparent'; // Варианты оформления карточки
export type CardPadding = '0' | '8' | '16' | '24'; // Варианты padding
export type CardBorder = 'round' | 'default' | 'partial'; // Варианты border radius
export type Gap = '0' | '4' | '8' | '16' | '24' | '32'; // Варианты gap

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'padding_0',
  '8': 'padding_8',
  '16': 'padding_16',
  '24': 'padding_24',
};

const mapGapToClass: Record<Gap, string> = {
  '0': 'gap_0',
  '4': 'gap_4',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
  '32': 'gap_32',
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  maxWidth?: boolean; // Флаг для занятия максимальной ширины контейнера.
  padding?: CardPadding;
  border?: CardBorder;
  flexColumn?: boolean; // Флаг для flex-direction: column.
  flexRow?: boolean; // Флаг для flex-direction: row.
  gap?: Gap;
  cursorPointer?: boolean; // Флаг для cursor: pointer.
  headersStyle?: boolean; // Стиль для Header и для остальных если нужно
  noShadow?: boolean; // Флаг для box-shadow: none.
}

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
    maxWidth,
    padding = '8',
    border = 'normal',
    flexColumn,
    flexRow,
    gap = '0',
    cursorPointer,
    headersStyle,
    noShadow,
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];
  const gapClass = mapGapToClass[gap];

  return (
    <div
      className={customCl(
        cl.Card,
        {
          [cl.maxWidth]: maxWidth,
          [cl.cursor]: cursorPointer,
          [cl.headersStyle]: headersStyle,
          [cl.noShadow]: noShadow,
          [cl.flexColumn]: flexColumn,
          [cl.flexRow]: flexRow,
        },
        [className, cl[variant], cl[paddingClass], cl[border], cl[gapClass]],
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
});
