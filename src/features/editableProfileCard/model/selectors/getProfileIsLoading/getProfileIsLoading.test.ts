import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileIsLoading } from './getProfileIsLoading';
import { ProfileSchema } from '../../types/editableProfileCardSchema';

describe('getProfileIsLoading.test', () => {
  test('should return isLoading', () => {
    const state: Partial<StateSchema> = {
      profile: {
        isLoading: true,
      } as ProfileSchema,
    };

    expect(getProfileIsLoading(state as StateSchema)).toEqual(true);
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
