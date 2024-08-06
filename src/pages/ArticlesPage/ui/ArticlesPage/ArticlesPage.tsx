import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Page } from '@/widgets/Page';

import { uiActions } from '@/features/UI';

import { StickyLayout } from '@/shared/layouts/StickyLayout';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlePage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticlesPageInitiated } from '../../model/selectors/articlesPageSelectors';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlePageProps {
  className?: string;
}

/**
 * Список reducer-ов для динамической загрузки для DynamicModuleLoader.
 */
const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

/**
 * Компонент `ArticlesPage` отвечает за отображение страницы со списком статей.
 * Он использует динамическую загрузку редюсеров, обработку скроллинга и инициализацию страницы.
 *
 * @param {ArticlePageProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент страницы статей.
 */

const ArticlesPage = (props: ArticlePageProps): JSX.Element => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const initiated = useSelector(getArticlesPageInitiated);

  const [searchParams] = useSearchParams();

  /**
   * Обработчик события прокрутки страницы.
   * Сохраняет текущую позицию прокрутки в состоянии.
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      dispatch(
        uiActions.setScrollPosition({
          path: 'articles',
          position: scrollPosition,
        }),
      );
    };

    window.addEventListener('scroll', handleScroll);

    // Удаление обработчика при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  // Обработчик загрузки следующей части списка статей.
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
        <Page onScrollEnd={onLoadNextPart} className={className}>
          <ArticleInfiniteList />
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

export default ArticlesPage;
