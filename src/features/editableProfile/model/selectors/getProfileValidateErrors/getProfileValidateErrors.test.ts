import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ProfileSchema } from '../../types/editableProfileCardSchema';
import { ValidateProfileError } from '../../consts/consts';

describe('getProfileValidateErrors.test', () => {
  test('should return validateErrors', () => {
    const state: Partial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.INCORRECT_FIRST,
          ValidateProfileError.INCORRECT_LAST,
          ValidateProfileError.INCORRECT_AGE,
          ValidateProfileError.INCORRECT_COUNTRY,
          ValidateProfileError.NO_DATA,
          ValidateProfileError.SERVER_ERROR,
        ],
      } as ProfileSchema,
    };

    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_FIRST,
      ValidateProfileError.INCORRECT_LAST,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
      ValidateProfileError.NO_DATA,
      ValidateProfileError.SERVER_ERROR,
    ]);
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
