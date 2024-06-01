import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import cl from './ArticleSortSelector.module.scss';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { ArticleSortField } from '../../model/types/article';
import { SortOrder } from 'shared/types';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeOrder, onChangeSort } = props;
  const { t } = useTranslation('articles');

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('возрастанию'),
      },
      {
        value: 'desc',
        content: t('убыванию'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('дате создания'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('названию'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('просмотрам'),
      },
    ],
    [t],
  );

  return (
    <div className={classNames(cl.ArticleSortSelector, {}, [className])}>
      {/* <Select */}
      <Select<ArticleSortField>
        options={sortFieldOptions}
        label={t('Сортировка по')}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        className={cl.order}
        options={orderOptions}
        label={t('по')}
        value={order}
        onChange={onChangeOrder}
      />
    </div>
  );
});
