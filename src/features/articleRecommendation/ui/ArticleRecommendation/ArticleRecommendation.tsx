import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';

import { useArticleRecommendationsList } from '../../api/ArticleRecommendationsApi';

interface ArticleRecommendationProps {
  className?: string;
}

/**
 * Компонент для отображения списка рекомендуемых статей.
 * @param {ArticleRecommendationProps} props - Свойства компонента.
 * @returns {JSX.Element | null} - Возвращает JSX элемент или null.
 */

export const ArticleRecommendation = memo(
  (props: ArticleRecommendationProps) => {
    const { className } = props;
    const { t } = useTranslation('article-info');

    // Хук для получения списка рекомендуемых статей, ограничение до 3 статей.
    const {
      isLoading,
      data: articles,
      error,
    } = useArticleRecommendationsList(3);

    if (isLoading) {
      return (
        <VStack gap="8" maxWidth align="center">
          <Skeleton width={230} height={40} border="20px" />
          <HStack gap="16">
            <Skeleton width={240} height={320} border="20px" />
            <Skeleton width={240} height={320} border="20px" />
            <Skeleton width={240} height={320} border="20px" />
          </HStack>
        </VStack>
      );
    }

    if (error || !articles) return null;

    return (
      <VStack className={className} gap="8" maxWidth align="center">
        <Text size="l" title={t('Рекомендации')} />
        <ArticleList articles={articles} target="_blank" />
      </VStack>
    );
  },
);
