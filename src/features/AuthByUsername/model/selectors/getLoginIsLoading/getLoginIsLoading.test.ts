import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading.test', () => {
  test('should return true', () => {
    const state: Partial<StateSchema> = {
      loginForm: {
        password: '',
        username: '',
        error: 'error',

        isLoading: true,
      },
    };
    expect(getLoginIsLoading(state as StateSchema)).toBe(true);
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getLoginIsLoading(state as StateSchema)).toBe(false);
  });
});
