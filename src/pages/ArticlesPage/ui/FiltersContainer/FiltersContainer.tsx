import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;

  const {
    onChangeSort,
    onChangeType,
    sort,
    type,
    onChangeSearch,
    search,
    onChangeOrder,
    order,
  } = useArticleFilters();

  return (
    <>
      <ArticlesFilters
        search={search}
        sort={sort}
        onChangeSort={onChangeSort}
        onChangeType={onChangeType}
        type={type}
        order={order}
        className={className}
        onChangeOrder={onChangeOrder}
        onChangeSearch={onChangeSearch}
      />
    </>
  );
});
