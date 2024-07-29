import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { VStack } from '@/shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/Input';
import SearchIcon from '@/shared/assets/icons/searchNew.svg';
import { Icon } from '@/shared/ui/Icon';

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
  const { t } = useTranslation();

  return (
    <Card
      className={classNames(cl.ArticlesFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="32">
        <Input
          onChange={onChangeSearch}
          value={search}
          size="s"
          placeholder={t('Поиск')}
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs
          className={cl.tabs}
          value={type}
          onChangeType={onChangeType}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
