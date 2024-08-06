import { memo } from 'react';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

/**
 * Компонент `FiltersContainer` отображает фильтры для статей.
 * Использует кастомный хук `useArticleFilters` для управления состоянием фильтров.
 *
 * @param {FiltersContainerProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент контейнера фильтров для статей.
 */

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;

  // Получение функций и значений фильтров из кастомного хука `useArticleFilters`
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
  );
});
