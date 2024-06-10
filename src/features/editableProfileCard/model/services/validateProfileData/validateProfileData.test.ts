import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

const data = {
  username: 'admin',
  age: 21,
  country: Country.Kazakhstan,
  first: 'Meirzhan',
  lastname: 'Beimishev',
  city: 'Almaty',
  currency: Currency.KZT,
};

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data); // mock input data

    expect(result).toEqual([]); // payload should be undef(no incorrect data)
  });

  test('without firstname and lastname', async () => {
    const result = validateProfileData({
      ...data,
      first: '',
      lastname: '',
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({
      ...data,
      age: NaN,
      // age: undefined,
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test('incorrect country', async () => {
    const result = validateProfileData({
      ...data,
      country: undefined,
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test('incorrect all', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });

  test('No data', async () => {
    const result = validateProfileData();

    expect(result).toEqual([ValidateProfileError.NO_DATA]);
  });
});
