import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
  test('should return password(string)', () => {
    const state: Partial<StateSchema> = {
      loginForm: {
        isLoading: true,
        error: 'error',
        username: '',

        password: 'password',
      },
    };
    expect(getLoginPassword(state as StateSchema)).toBe('password');
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getLoginPassword(state as StateSchema)).toBe('');
  });
});
