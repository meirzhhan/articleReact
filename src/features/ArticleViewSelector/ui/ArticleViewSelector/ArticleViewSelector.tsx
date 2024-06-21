import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './ArticleViewSelector.module.scss';

import ListIconDeprecated from '@/shared/assets/icons/list.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled.svg';
import ListIcon from '@/shared/assets/icons/burgerNew.svg';
import TiledIcon from '@/shared/assets/icons/tileNew.svg';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TiledIcon,
      off: () => TiledIconDeprecated,
    }),
  },
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  }; // Вызов функции -> return новую функцию наверх

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          border="round"
          className={classNames(cl.ArticleViewSelectorRedesigned, {}, [
            className,
          ])}
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
      }
      off={
        <div className={classNames(cl.ArticleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              theme={ButtonTheme.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <IconDeprecated
                width={24}
                height={24}
                Svg={viewType.icon}
                className={classNames(
                  '',
                  { [cl.notSelected]: viewType.view !== view },
                  [],
                )}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
});
