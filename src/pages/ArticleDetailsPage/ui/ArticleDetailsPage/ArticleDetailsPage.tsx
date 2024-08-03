import { useClassName } from '@/shared/lib/hooks/useClassName';
import cl from './ArticleDetailsPage.module.scss';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendation } from '@/features/articleRecommendation';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <StickyContentLayout
        content={
          <Page
            className={useClassName(cl.ArticleDetailsPage, {}, [className])}
          >
            <VStack gap={'24'}>
              <DetailsContainer />
              <ArticleRating articleId={id} />
              <ArticleRecommendation />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
        right={<AdditionalInfoContainer />}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
