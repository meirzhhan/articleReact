import axios from 'axios';
import { loginByUsername } from './loginByUsername';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

describe('loginByUsername.test', () => {
  // let dispatch: Dispatch;
  // let getState: () => StateSchema;

  // beforeEach(() => {
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });

  // test('success login', async () => {
  //   const userValue = { username: '123', id: '1' };
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // Сценарий возвращения userValue
  //   const action = loginByUsername({ username: '123', password: '123' });
  //   const result = await action(dispatch, getState, undefined);
  //   // console.log(result);

  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // Проверка вызова dispatch с помощью userActions.setAuthData
  //   expect(dispatch).toHaveBeenCalledTimes(3); // сам AsyncThunk, dispatch(setAuthData()), return
  //   expect(mockedAxios.post).toHaveBeenCalled(); // проверка вызова axios
  //   expect(result.meta.requestStatus).toBe('fulfilled'); // проверка статуса
  //   expect(result.payload).toEqual(userValue); // return response.data
  // });

  // test('error login', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 })); // Сценарий возращения статус кода 403
  //   const action = loginByUsername({ username: '123', password: '123' });
  //   const result = await action(dispatch, getState, undefined);
  //   // console.log(result);

  //   expect(dispatch).toHaveBeenCalledTimes(2); // return response.data не срабатывает
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(result.meta.requestStatus).toBe('rejected');
  //   expect(result.payload).toEqual('Вы ввели неверный логин или пароль'); // catch => return rejectedWithValue('Вы ввели неверный логин или пароль')
  // });

  test('success login', async () => {
    const userValue = { username: '123', id: '1' };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // Сценарий возвращения userValue

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: '123', password: '123' });
    // console.log(result);

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue),
    ); // Проверка вызова dispatch с помощью userActions.setAuthData
    expect(thunk.dispatch).toHaveBeenCalledTimes(3); // сам AsyncThunk, dispatch(setAuthData()), return
    expect(mockedAxios.post).toHaveBeenCalled(); // проверка вызова axios
    expect(result.meta.requestStatus).toBe('fulfilled'); // проверка статуса
    expect(result.payload).toEqual(userValue); // return response.data
  });

  test('error login', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 })); // Сценарий возращения статус кода 403

    const thunk = new TestAsyncThunk(loginByUsername); // Return
    const result = await thunk.callThunk({ username: '123', password: '123' });
    // console.log(result);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2); // return response.data не срабатывает
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Вы ввели неверный логин или пароль'); // catch => return rejectedWithValue('Вы ввели неверный логин или пароль')
  });
});
