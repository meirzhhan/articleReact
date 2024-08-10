import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';

import { TabItem, Tabs } from '@/shared/ui/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType; // 'ALL' | 'IT' | 'SCIENCE' | 'ECONOMICS'
  onChangeType: (type: ArticleType) => void;
}

/**
 * Компонент вкладок для фильтрации статей по типу.
 * @param {ArticleTypeTabsProps} props - Свойства компонента.
 * @returns {JSX.Element} - Возвращает JSX элемент.
 */
export const ArticleTypes = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation('articles');

  // Опции для типов фильтрации статей
  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('Все статьи'),
      },
      {
        value: ArticleType.BUSINESS,
        content: t('Бизнес'),
      },
      {
        value: ArticleType.TECHNOLOGIES,
        content: t('Технологии'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.GREEN,
        content: t('Природа'),
      },
      {
        value: ArticleType.IT,
        content: t('АйТи'),
      },
    ],
    [t],
  );

  // Обработчик клика
  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <Tabs
      className={className}
      direction="column"
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
    />
  );
});
