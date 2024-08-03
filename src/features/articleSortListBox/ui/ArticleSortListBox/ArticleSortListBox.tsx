import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entities/Article';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ListBox } from '@/shared/ui/Popups';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import { SortOrder } from '@/shared/types/sort';

interface ArticleSortListBoxProps {
  className?: string;
  sort: ArticleSortField; // сортировка по (date | views | name)
  order: SortOrder; // сортировка по порядку (asc | desc)
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

/**
 * Компонент для выбора сортировки статей.
 * @param {ArticleSortListBoxProps} props - Свойства компонента.
 * @returns {JSX.Element} - Возвращает JSX элемент.
 */

export const ArticleSortListBox = memo((props: ArticleSortListBoxProps) => {
  const { className, sort, order, onChangeOrder, onChangeSort } = props;
  const { t } = useTranslation('articles');

  // Опции для порядка сортировки
  const orderOptions = useMemo(
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

  // Опции для поля сортировки
  const sortFieldOptions = useMemo(
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
    <VStack className={className} gap="8">
      <Text text={t('Сортировка по')} />
      <ListBox items={sortFieldOptions} value={sort} onChange={onChangeSort} />
      <ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
    </VStack>
  );
});
