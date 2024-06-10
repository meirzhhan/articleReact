import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';
import { ProfileSchema } from '../../types/editableProfileCardSchema';

describe('getProfileError.test', () => {
  test('should return error', () => {
    const state: Partial<StateSchema> = {
      profile: {
        error: 'error',
      } as ProfileSchema,
    };

    expect(getProfileError(state as StateSchema)).toEqual('error');
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getProfileError(state as StateSchema)).toEqual(undefined);
  });
});
