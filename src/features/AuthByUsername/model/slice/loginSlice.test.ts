import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: Partial<LoginSchema> = {
      username: 'something',
    };
    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('username')),
    ).toStrictEqual({ username: 'username' });
  });

  test('test set Password', () => {
    const state: Partial<LoginSchema> = {
      password: 'something',
    };
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('password')),
    ).toStrictEqual({ password: 'password' });
  });
});
