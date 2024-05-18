import { Country } from 'entities/Country';
import { ProfileSchema } from '../../types/profile';
import { getProfileData } from './getProfileData';
import { Currency } from 'entities/Currency';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getProfileData.test', () => {
  test('should return data', () => {
    const data = {
      username: 'admin',
      age: 21,
      country: Country.Kazakhstan,
      first: 'Meirzhan',
      lastname: 'Beimishev',
      city: 'Almaty',
      currency: Currency.KZT,
    };

    const state: Partial<StateSchema> = {
      profile: {
        data: data,
      } as ProfileSchema,
    };

    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
