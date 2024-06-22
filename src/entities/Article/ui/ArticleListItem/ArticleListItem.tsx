import { HTMLAttributeAnchorTarget, memo } from 'react';

import cl from './ArticleListItem.module.scss';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );
});
