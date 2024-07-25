import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleRecommendationsList } from '../../api/ArticleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

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
      <VStack gap="8" className={classNames('', {}, [className])}>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text size="l" title={t('Рекомендации')} />}
          off={<TextDeprecated size={TextSize.L} title={t('Рекомендации')} />}
        />

        <ArticleList articles={articles} target="_blank" />
      </VStack>
    );
  },
);
