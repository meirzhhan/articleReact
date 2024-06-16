import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticlesPageInitiated } from '../../selectors/articlesPageSelectors';
import { articlePageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export const initArticlesPage = createAsyncThunk<
  void, // return value
  URLSearchParams, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('articlesPage/initArticlesPage', async (searchParams, ThunkApi) => {
  const { getState, dispatch } = ThunkApi;

  const initiated = getArticlesPageInitiated(getState());

  if (!initiated) {
    // gets params from url
    const orderFromUrl = searchParams.get('order') as SortOrder;
    const sortFromUrl = searchParams.get('sort') as ArticleSortField;
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type') as ArticleType;

    // dispatch param if exists
    if (orderFromUrl) dispatch(articlePageActions.setOrder(orderFromUrl));
    if (sortFromUrl) dispatch(articlePageActions.setSort(sortFromUrl));
    if (searchFromUrl) dispatch(articlePageActions.setSearch(searchFromUrl));
    if (typeFromUrl) dispatch(articlePageActions.setType(typeFromUrl));

    dispatch(articlePageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
