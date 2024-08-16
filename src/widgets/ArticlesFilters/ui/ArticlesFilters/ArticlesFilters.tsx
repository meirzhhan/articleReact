import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useArticleFilters } from '@/pages/ArticlesPage/lib/hooks/useArticleFilters';

import { ArticleSortListBox } from '@/features/articleSortListBox';
import { ArticleTypes } from '@/features/articleTypes';
import { ArticleViews } from '@/features/articleViews';

import { ArticleSortField, ArticleType } from '@/entities/Article';

import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { SortOrder } from '@/shared/types/sort';
import SearchIcon from '@/shared/assets/icons/search.svg';

import cl from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeType: (type: ArticleType) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

/**
 * Компонент ArticlesFilters предоставляет интерфейс для фильтрации и сортировки статей.
 *
 * @param {ArticlesFiltersProps} props - props для компонента.
 * @param {ArticleSortField} props.sort - для сортировки статей. ['views' | 'title' | 'createdAt',]
 * @param {SortOrder} props.order - Порядок сортировки статей. [asc | desk]
 * @param {ArticleType} props.type - Тип статьи для фильтрации. ['ALL' | 'IT' | 'SCIENCE' | 'ECONOMICS']
 * @param {string} props.search - input value.
 * @param {Function} props.onChangeSearch - Обработчик изменения input.
 * @param {Function} props.onChangeType - Обработчик изменения типа статьи.
 * @param {Function} props.onChangeOrder - Обработчик изменения порядка сортировки.
 * @param {Function} props.onChangeSort - Обработчик изменения поля сортировки.
 *
 * @returns {JSX.Element} Отрендеренный компонент фильтров для статей.
 */

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    search,
    sort,
    type,
  } = props;

  const { t } = useTranslation('articles');
  const { view, onChangeView } = useArticleFilters();

  return (
    <VStack className={className} gap="24">
      <ArticleViews view={view} onViewClick={onChangeView} />

      <Card
        className={cl.card}
        padding="24"
        border="partial"
        flexColumn
        gap="24"
      >
        <Input
          onChange={onChangeSearch}
          value={search}
          size="s"
          placeholder={t('Поиск')}
          addonRight={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypes value={type} onChangeType={onChangeType} />
        <ArticleSortListBox
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </Card>
    </VStack>
  );
});
