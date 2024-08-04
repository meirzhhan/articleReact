import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

import { ArticleRecommendation } from '@/features/articleRecommendation';
import { ArticleRating } from '@/features/articleRating';

import { VStack } from '@/shared/ui/Stack';
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { ArticleAsideContainer } from '../ArticleAsideContainer/ArticleAsideContainer';
import { ArticleComments } from '../ArticleComments/ArticleComments';
import { articleDetailsPageReducer } from '../../model/slices';
import { InfoContainer } from '../InfoContainer/InfoContainer';

/**
 * Список reducer-ов для динамической загрузки для DynamicModuleLoader.
 */
const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

/**
 * Компонент страницы статьи (Детали статьи, рейтинг, рекомендации, комментарии).
 *
 * @param {ArticleDetailsPageProps} props - Пропсы для компонента.
 * @returns {JSX.Element|null} Страница с деталями статьи.
 */

const ArticleInfoPage = (props: { className?: string }): JSX.Element | null => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <StickyLayout
        content={
          <Page className={className}>
            <VStack gap={'24'}>
              <InfoContainer />
              <ArticleRating articleId={id} />
              <ArticleRecommendation />
              <ArticleComments id={id} />
            </VStack>
          </Page>
        }
        right={<ArticleAsideContainer />}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleInfoPage);
