import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginError } from './getLoginError';

describe('getLoginError.test', () => {
  test('should return error', () => {
    const state: Partial<StateSchema> = {
      loginForm: {
        isLoading: false,
        password: '',
        username: '',

        error: 'error',
      },
    };
    expect(getLoginError(state as StateSchema)).toBe('error');
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getLoginError(state as StateSchema)).toBe(undefined);
  });
});
