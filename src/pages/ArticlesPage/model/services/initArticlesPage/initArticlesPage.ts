import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInitiated } from '../../selectors/articlesPageSelectors';
import { articlePageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void, // return value
  void, // input value
  ThunkConfig<string> // extra, state and <rejectValue>
>('articlesPage/initArticlesPage', async (_, ThunkApi) => {
  const { getState, dispatch } = ThunkApi;

  const initiated = getArticlesPageInitiated(getState());

  if (!initiated) {
    dispatch(articlePageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
