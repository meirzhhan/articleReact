import { HTMLAttributeAnchorTarget, memo } from 'react';

import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  return <ArticleListItemRedesigned {...props} />;
});
