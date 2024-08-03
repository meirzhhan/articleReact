import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

const data = {
  username: 'admin',
  age: 21,
  country: Country.Kazakhstan,
  first: 'Meirzhan',
  lastname: 'Beimishev',
  city: 'Almaty',
  currency: Currency.KZT,
};

describe('fetchProfileData.test', () => {
  test('success get data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData); // mock AsyncThunk
    thunk.api.get.mockReturnValue(Promise.resolve({ data: data })); // mock return data

    const result = await thunk.callThunk('1'); // results of mocked AsyncThunk(meta, payload)
    // console.log(result);

    expect(thunk.api.get).toHaveBeenCalled(); // .get should work
    expect(result.meta.requestStatus).toBe('fulfilled'); // status should be fulfilled
    expect(result.payload).toEqual(data); // payload should be data
  });

  test('error get data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 })); // mock error
    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
