import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID } from 'widgets/Page/Page';

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
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
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

  const isBig = view === ArticleView.BIG;

  const itemsPerRow = isBig ? 1 : 4;
  const rowCount = isBig
    ? articles.length
    : Math.ceil(articles.length / itemsPerRow);

  const rowRender = ({ index, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <ArticleListItem
          target={target}
          article={articles[i]}
          view={view}
          className={cls.card}
          key={`str${i}`}
        />,
      );
    }

    return (
      <div className={cls.row} key={key} style={style}>
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
      {({
        height,
        width,
        registerChild,
        onChildScroll,
        isScrolling,
        scrollTop,
      }) => (
        <div
          ref={registerChild as (instance: HTMLDivElement | null) => void}
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          <List
            height={height ?? 700}
            rowCount={rowCount}
            rowHeight={isBig ? 700 : 330}
            rowRenderer={rowRender}
            width={width ? width - 80 : 700}
            autoHeight
            onScroll={onChildScroll}
            isScrolling={isScrolling} //
            scrollTop={scrollTop}
          />
          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
