import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from './getArticleDetails';

describe('getArticleDetails.test', () => {
  test('getArticleDetailsData', () => {
    const data = {
      id: '1',
      title: 'title',
    };
    const state: Partial<StateSchema> = {
      articleDetails: {
        data: data,
      } as ArticleDetailsSchema,
    };

    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test('getArticleDetailsIsLoading', () => {
    const state: Partial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      } as ArticleDetailsSchema,
    };

    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });

  test('getArticleDetailsError', () => {
    const state: Partial<StateSchema> = {
      articleDetails: {
        error: 'lol',
      } as ArticleDetailsSchema,
    };

    expect(getArticleDetailsError(state as StateSchema)).toEqual('lol');
  });
});
