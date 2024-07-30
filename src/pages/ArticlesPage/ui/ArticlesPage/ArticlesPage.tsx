import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticlesPage.module.scss';
import { memo, useCallback, useEffect } from 'react';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlePage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { useSearchParams } from 'react-router-dom';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { getArticlesPageInitiated } from '../../model/selectors/articlesPageSelectors';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlePageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlePageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const initiated = useSelector(getArticlesPageInitiated);

  const [searchParams] = useSearchParams();

  // const articleItem = useArticleItemById('2'); // TODO: Should use this instead useSelector
  // console.log(articleItem);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch, initiated, searchParams]);

  const content = (
    <StickyContentLayout
      right={<FiltersContainer />}
      content={
        <Page
          onScrollEnd={onLoadNextPart}
          className={classNames(cl.ArticlesPageRedesigned, {}, [className])}
        >
          <ArticleInfiniteList className={cl.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);

// 17 : 20
