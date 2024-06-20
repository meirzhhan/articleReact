import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cl from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={cl.card} key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const { t } = useTranslation('article-details');
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target,
  } = props;

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <div className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
      {articles.map((item) => (
        <ArticleListItem
          key={item.id}
          article={item}
          view={view}
          target={target}
          className={cl.card}
        />
      ))}

      {isLoading && getSkeletons(view)}
    </div>
  );
});
