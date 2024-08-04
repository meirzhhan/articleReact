import { useClassName } from '@/shared/lib/hooks/useClassName';
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
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { uiActions } from '@/features/UI';

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Get current scroll position
      dispatch(
        uiActions.setScrollPosition({
          path: 'articles',
          position: scrollPosition,
        }),
      );
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch, initiated, searchParams]);

  const content = (
    <StickyLayout
      right={<FiltersContainer />}
      content={
        <Page
          onScrollEnd={onLoadNextPart}
          className={useClassName(cl.ArticlesPageRedesigned, {}, [className])}
        >
          <ArticleInfiniteList className={cl.list} />
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
