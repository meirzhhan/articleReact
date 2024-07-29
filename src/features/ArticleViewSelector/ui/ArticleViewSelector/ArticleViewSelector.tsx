import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './ArticleViewSelector.module.scss';

import ListIcon from '@/shared/assets/icons/burgerNew.svg';
import TiledIcon from '@/shared/assets/icons/tileNew.svg';

import { ArticleView } from '@/entities/Article';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

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

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  }; // Вызов функции -> return новую функцию наверх

  return (
    <Card
      border="round"
      className={classNames(cl.ArticleViewSelectorRedesigned, {}, [className])}
    >
      <HStack gap="8">
        {viewTypes.map((viewType) => (
          <Icon
            clickable
            onClick={onClick(viewType.view)}
            key={viewType.view}
            Svg={viewType.icon}
            className={classNames(
              '',
              { [cl.notSelected]: viewType.view !== view },
              [],
            )}
          />
        ))}
      </HStack>
    </Card>
  );
});
