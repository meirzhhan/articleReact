import { memo } from 'react';

import { ArticleView } from '@/entities/Article';

import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import ListIcon from '@/shared/assets/icons/burgerNew.svg';
import TiledIcon from '@/shared/assets/icons/tileNew.svg';

import cl from './ArticleView.module.scss';

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

export const ArticleViewSelector = memo((props: ArticleViewProps) => {
  const { className, view, onViewClick } = props;

  // Функция для обработки клика по типу отображения
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  }; // Возвращает функцию для вызова с новым типом отображения

  return (
    <Card
      border="partial"
      max
      className={useClassName(cl.Main, {}, [className])}
      rowGap="8"
    >
      {viewTypes.map((type) => (
        <Icon
          key={type.view}
          clickable
          onClick={onClick(type.view)}
          Svg={type.icon}
          className={useClassName(
            '',
            { [cl.notSelected]: type.view !== view },
            [],
          )}
        />
      ))}
    </Card>
  );
});
