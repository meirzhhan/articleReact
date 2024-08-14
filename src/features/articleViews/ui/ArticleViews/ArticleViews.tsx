import { memo } from 'react';

import { ArticleView } from '@/entities/Article';

import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { customCl } from '@/shared/lib/hooks/useClassName';
import ListIcon from '@/shared/assets/icons/list.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';

import cl from './ArticleViews.module.scss';

interface ArticleViewProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

// Массив с типами отображения и соответствующими иконками
const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

/**
 * Компонент для выбора типа отображения статей (плитка или список).
 * @param {ArticleViewProps} props - Свойства компонента.
 * @returns {JSX.Element} - Возвращает JSX элемент.
 */

export const ArticleViews = memo((props: ArticleViewProps) => {
  const { className, view, onViewClick } = props;

  // Функция для обработки клика по типу отображения
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  }; // Возвращает функцию для вызова с новым типом отображения

  // Создаем массив иконок с соответствующими классами

  return (
    <Card
      border="partial"
      max
      className={customCl(cl.Main, {}, [className])}
      rowGap="8"
    >
      {viewTypes.map((type) => {
        const IconClassName = type.view !== view && cl.notSelected;

        return (
          <Icon
            key={type.view}
            clickable
            onClick={onClick(type.view)}
            Svg={type.icon}
            className={IconClassName}
          />
        );
      })}
    </Card>
  );
});
