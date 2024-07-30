import { useClassName } from '@/shared/lib/hooks/useClassName';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/ArticleRecommendationsApi';
import { Text } from '@/shared/ui/Text';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const {
      isLoading,
      data: articles,
      error,
    } = useArticleRecommendationsList(4); // RTK query params in the Hook

    if (isLoading || error || !articles) return null;

    return (
      <VStack gap="8" className={useClassName('', {}, [className])}>
        <Text size="l" title={t('Рекомендации')} />

        <ArticleList articles={articles} target="_blank" />
      </VStack>
    );
  },
);
