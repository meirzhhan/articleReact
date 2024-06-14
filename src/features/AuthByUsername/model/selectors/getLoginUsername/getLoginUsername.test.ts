import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
  test('should return username(string)', () => {
    const state: Partial<StateSchema> = {
      loginForm: {
        isLoading: true,
        password: 'password',
        error: 'error',

        username: 'user',
      },
    };
    expect(getLoginUsername(state as StateSchema)).toBe('user');
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toBe('');
  });
});
