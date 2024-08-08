import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { RenderBlocks } from '../RenderBlocks/RenderBlocks';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { ArticleInfoSkeleton } from '../ArticleSkeletons/ArticleSkeletons';

import cl from './ArticleInfo.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

/**
 * Список reducer-ов для динамической загрузки для DynamicModuleLoader.
 */
const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const Info = () => {
  const article = useSelector(getArticleDetailsData);
  if (!article) return null;

  return (
    <>
      <Text title={article?.title} size="l" bold />
      <Text title={article?.subtitle} />
      <AppImage
        className={cl.img}
        fallback={<Skeleton width={'100%'} height={420} />}
        src={article?.img}
        height={420}
      />

      {article?.blocks.map(RenderBlocks)}
    </>
  );
};

/**
 * Компонент, отображающий детали статьи.
 *
 * @param {ArticleDetailsProps}  props - Свойства компонента.
 * @returns {JSX.Element} Компонент.
 */

export const ArticleInfo = memo((props: ArticleDetailsProps) => {
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
    content = <ArticleInfoSkeleton />;
  } else if (error) {
    content = (
      <Text align="center" title={t('Произошла ошибка при загрузке статьи.')} />
    );
  } else content = <Info />;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        className={useClassName(cl.ArticleDetails, {}, [className])}
        gap={'16'}
        maxWidth
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
