import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from './updateProfileData';
import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profile';

const data = {
  username: 'admin',
  age: 21,
  country: Country.Kazakhstan,
  first: 'Meirzhan',
  lastname: 'Beimishev',
  city: 'Almaty',
  currency: Currency.KZT,
};

describe('updateProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    } as StateSchema); // mock initialState for AsyncThunk

    thunk.api.put.mockReturnValue(Promise.resolve({ data: data })); // mock return data

    const result = await thunk.callThunk();
    // console.log(result);

    expect(thunk.api.put).toHaveBeenCalled(); // .put should work
    expect(result.meta.requestStatus).toBe('fulfilled'); // status should be fulfilled
    expect(result.payload).toEqual(data); // payload should be data
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    } as StateSchema); // filled state
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 })); // mock error

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]); // should return rejectWithValue
  });

  test('validate error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, lastname: '', age: NaN, country: undefined },
      },
    } as StateSchema); // incorrect filled lastname

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]); // should return validate errors
  });
});
