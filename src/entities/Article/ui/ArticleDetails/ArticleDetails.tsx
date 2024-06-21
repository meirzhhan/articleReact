import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ArticleDetails.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { memo, useEffect, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { ArticleBlock } from '../../model/types/article';
import { ArticleBlockType } from '@/entities/Article/model/consts/articleConsts';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBlock, index: number) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={index}
            className={cl.block}
            block={block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={index}
            className={cl.block}
            block={block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={index}
            className={cl.block}
            block={block}
          />
        );
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cl.avatar}
          width={200}
          height={200}
          border={'50%'}
        />
        <Skeleton className={cl.title} width={300} height={32} />
        <Skeleton className={cl.skeleton} width={600} height={24} />
        <Skeleton className={cl.skeleton} width="100%" height={200} />
        <Skeleton className={cl.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t('Произошла ошибка при загрузке статьи.')}
      />
    );
  } else {
    content = (
      <>
        <HStack justify={'center'} max className={cl.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cl.avatar} />
        </HStack>

        <VStack gap={'4'} max>
          <Text
            className={cl.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap={'8'} className={cl.articleInfo}>
            <Icon className={cl.icon} Svg={EyeIcon} />
            <Text title={String(article?.views)} />
          </HStack>
          <HStack gap={'8'} className={cl.articleInfo}>
            <Icon className={cl.icon} Svg={CalendarIcon} />
            <Text title={article?.createdAt} />
          </HStack>
        </VStack>

        {article?.blocks.map(renderBlock)}
      </>
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
