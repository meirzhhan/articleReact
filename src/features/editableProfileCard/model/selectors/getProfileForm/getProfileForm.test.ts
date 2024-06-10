import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { ProfileSchema } from '../../types/editableProfileCardSchema';

describe('getProfileForm.test', () => {
  test('should return form', () => {
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
        form: data,
      } as ProfileSchema,
    };

    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
