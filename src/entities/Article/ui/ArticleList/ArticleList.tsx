import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 12 : 2)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={cl.card} key={index} view={view} />
    ));
};

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.SMALL } = props;

  if (isLoading) {
    return (
      <div className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  const renderArticle = (article: Article) => (
    <ArticleListItem
      className={cl.card}
      key={article.id}
      article={article}
      view={view}
    />
  );

  return (
    <div className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
      {articles.length ? articles.map(renderArticle) : null}
    </div>
  );
});
