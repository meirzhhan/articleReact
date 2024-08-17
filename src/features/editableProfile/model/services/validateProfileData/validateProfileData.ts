import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../../consts/consts';

/**
 * Функция для валидации обновленных данных.
 * Проверяет наличие полей `first` и `lastname`, является ли `age` действительным целым числом,
 * заполнено ли поле `country` и т.д.
 *
 * @param {Profile} [profile] - Данные профиля для проверки. Если данные не предоставлены, возвращается ошибка о отсутствии данных.
 * @returns {ValidateProfileError[]} Массив ошибок проверки. Если ошибок нет, массив будет пустым.
 */

export const validateProfileData = (
  profile?: Profile,
): ValidateProfileError[] => {
  if (!profile) return [ValidateProfileError.NO_DATA];

  const { first, lastname, age, country } = profile;

  const errors: ValidateProfileError[] = [];

  if (!first) errors.push(ValidateProfileError.INCORRECT_FIRST);

  if (!lastname) errors.push(ValidateProfileError.INCORRECT_LAST);

  if (!age || !Number.isInteger(age))
    errors.push(ValidateProfileError.INCORRECT_AGE);

  if (!country) errors.push(ValidateProfileError.INCORRECT_COUNTRY);

  return errors;
};
