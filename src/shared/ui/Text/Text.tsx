import { memo } from 'react';

import { customCl } from '@/shared/lib/hooks/useClassName';

import cl from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent'; // Типы вариантов цвета текста.
export type TextAlign = 'right' | 'left' | 'center'; // Типы выравнивания текста.
export type TextSize = 's' | 'm' | 'l'; // Типы размеров текста.

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

const mapSizeToClass: Record<TextSize, string> = {
  s: cl['size_s'],
  m: cl['size_m'],
  l: cl['size_l'],
};

interface TextProps {
  className?: string;
  title?: string; // Заголовок
  text?: string; // Основной текст
  variant?: TextVariant; // Вариант цвета текста.
  align?: TextAlign; // Выравнивание текста.
  size?: TextSize; // Размер текста.
  bold?: boolean; //  Жирный стиль для текста.
  'data-testid'?: string;
}

/**
 * Компонент Text отображает текстовые элементы с возможностью настройки стилей, выравнивания и размеров.
 *
 * @param {TextProps} props - Свойства для компонента.
 * @returns {JSX.Element} Отрендеренный компонент.
 */

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    variant = 'primary',
    align = 'left',
    size = 'm',
    bold,
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  const additionalClasses = [className, cl[variant], cl[align], sizeClass];

  return (
    <div className={customCl(cl.Text, { [cl.bold]: bold }, additionalClasses)}>
      {title && (
        <HeaderTag
          className={cl.title}
          {...(process.env.NODE_ENV === 'development' && {
            'data-testid': `${dataTestId}.Header`,
          })}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p
          className={cl.text}
          {...(process.env.NODE_ENV === 'development' && {
            'data-testid': `${dataTestId}.Paragraph`,
          })}
        >
          {text}
        </p>
      )}
    </div>
  );
});
