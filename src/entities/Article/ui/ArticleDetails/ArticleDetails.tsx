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
import {
  Text as TextDeprecated,
  TextAlign,
  TextSize,
} from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { renderArticleBlock } from './renderBlock';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify={'center'} max className={cl.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cl.avatar} />
      </HStack>

      <VStack gap={'4'} max>
        <TextDeprecated
          className={cl.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap={'8'} className={cl.articleInfo}>
          <Icon className={cl.icon} Svg={EyeIcon} />
          <TextDeprecated title={String(article?.views)} />
        </HStack>
        <HStack gap={'8'} className={cl.articleInfo}>
          <Icon className={cl.icon} Svg={CalendarIcon} />
          <TextDeprecated title={article?.createdAt} />
        </HStack>
      </VStack>

      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text title={article?.title} size="l" bold />
      <Text title={article?.subtitle} />
      <AppImage
        className={cl.img}
        fallback={
          <SkeletonRedesigned width={'100%'} height={420} border="16px" />
        }
        src={article?.img}
      />

      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetailsSkeleton = () => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

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
      <TextDeprecated
        align={TextAlign.CENTER}
        title={t('Произошла ошибка при загрузке статьи.')}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
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
