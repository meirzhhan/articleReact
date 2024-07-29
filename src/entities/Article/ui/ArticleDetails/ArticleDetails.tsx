import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ArticleDetails.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { memo, useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { renderArticleBlock } from './renderBlock';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text title={article?.title} size="l" bold />
      <Text title={article?.subtitle} />
      <AppImage
        className={cl.img}
        fallback={<Skeleton width={'100%'} height={420} border="16px" />}
        src={article?.img}
      />

      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetailsSkeleton = () => {
  return (
    <VStack gap="16" max>
      <Skeleton className={cl.avatar} width={200} height={200} border={'50%'} />
      <Skeleton className={cl.title} width={300} height={32} />
      <Skeleton className={cl.skeleton} width={600} height={24} />
      <Skeleton className={cl.skeleton} width="100%" height={200} />
      <Skeleton className={cl.skeleton} width="100%" height={200} />
    </VStack>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <Text align="center" title={t('Произошла ошибка при загрузке статьи.')} />
    );
  } else {
    content = <Redesigned />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        gap={'16'}
        max
        className={classNames(cl.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
