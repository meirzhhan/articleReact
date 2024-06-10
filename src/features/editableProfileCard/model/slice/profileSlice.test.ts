import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import {
  ProfileSchema,
  ValidateProfileError,
} from '../types/editableProfileCardSchema';

const data = {
  username: 'admin',
  age: 21,
  country: Country.Kazakhstan,
  first: 'Meirzhan',
  lastname: 'Beimishev',
  city: 'Almaty',
  currency: Currency.KZT,
};

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: Partial<ProfileSchema> = { readonly: false }; // initialState
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true)), // 1 - initialState, 2 - reducer
    ).toStrictEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: Partial<ProfileSchema> = {
      data,
      form: { ...data, first: 'New name which need to cancel  ' },
      validateErrors: [
        ValidateProfileError.INCORRECT_AGE,
        ValidateProfileError.INCORRECT_COUNTRY,
      ],
    };
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toStrictEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    });
  });

  test('test update profile', () => {
    const state: Partial<ProfileSchema> = {
      form: { first: '123' },
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ first: 'newName' }),
      ),
    ).toStrictEqual({ form: { first: 'newName' } });
  });

  test('test update profileData service pending', () => {
    const state: Partial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending as any),
    ).toStrictEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test('test update profileData service fullfiled', () => {
    const state: Partial<ProfileSchema> = {
      isLoading: true,
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, ''),
      ),
    ).toStrictEqual({
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      form: data,
      data,
    });
  });
});
