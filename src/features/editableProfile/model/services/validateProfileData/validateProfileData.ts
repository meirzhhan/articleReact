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

export const validateProfileData = (profile?: Profile) => {
  if (!profile) return [ValidateProfileError.NO_DATA];

  const { first, lastname, age, country } = profile;

  const errors: ValidateProfileError[] = [];

  if (!first || !lastname)
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);

  if (!age || !Number.isInteger(age))
    errors.push(ValidateProfileError.INCORRECT_AGE);

  if (!country) errors.push(ValidateProfileError.INCORRECT_COUNTRY);

  return errors;
};
