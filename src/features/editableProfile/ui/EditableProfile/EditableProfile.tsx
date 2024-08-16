import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ValidateProfileError } from '@/features/editableProfile/model/consts/consts';

import { ProfileCard } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import {
  DynamicReducer,
  ReducersList,
} from '@/shared/lib/components/DynamicReducer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { EditableProfileHeader } from '../EditableProfileHeader/EditableProfileHeader';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';

interface EditableProfileProps {
  className?: string;
  id?: string;
}

/**
 * Список reducer-ов для динамической загрузки для DynamicModuleLoader.
 */
const reducers: ReducersList = {
  profile: profileReducer,
};

/**
 * Компонент `EditableProfileCard` отображает редактируемую карточку профиля пользователя.
 * Компонент загружает данные профиля и позволяет пользователю обновлять информацию о себе.
 *
 * @param {EditableProfileProps} props - Свойства компонента.
 * @param {string} [props.id] - Идентификатор профиля для загрузки данных.
 * @returns {JSX.Element} - Возвращает элемент редактируемой карточки профиля.
 */

export const EditableProfile = memo((props: EditableProfileProps) => {
  const { className, id } = props;
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);

  // Возможные варианты ошибки валидации при вводе
  const validateErrorsTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная страна'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
  };

  useEffect(() => {
    if (id) dispatch(fetchProfileData(id));
  }, [dispatch, id]);

  // Обработчик изменения имени.
  const onChangeFirstname = useCallback(
    (newFirstname?: string) => {
      dispatch(profileActions.updateProfile({ first: newFirstname || '' }));
    },
    [dispatch],
  );

  // Обработчик изменения фамилии.
  const onChangeLastname = useCallback(
    (newLastname?: string) => {
      dispatch(profileActions.updateProfile({ lastname: newLastname || '' }));
    },
    [dispatch],
  );

  // Обработчик изменения города.
  const onChangeCity = useCallback(
    (newCity?: string) => {
      dispatch(profileActions.updateProfile({ city: newCity || '' }));
    },
    [dispatch],
  );

  // Обработчик изменения возраста.
  const onChangeAge = useCallback(
    (newAge?: string) => {
      dispatch(profileActions.updateProfile({ age: Number(newAge || 0) }));
    },
    [dispatch],
  );

  // Обработчик изменения login-a.
  const onChangeUsername = useCallback(
    (newUsername?: string) => {
      dispatch(profileActions.updateProfile({ username: newUsername || '' }));
    },
    [dispatch],
  );

  // Обработчик изменения аватара.
  const onChangeAvatar = useCallback(
    (newAvatar?: string) => {
      dispatch(profileActions.updateProfile({ avatar: newAvatar || '' }));
    },
    [dispatch],
  );

  // Обработчик изменения валюты.
  const onChangeCurrency = useCallback(
    (newCurrency?: Currency) => {
      dispatch(profileActions.updateProfile({ currency: newCurrency }));
    },
    [dispatch],
  );

  // Обработчик изменения страны.
  const onChangeCountry = useCallback(
    (newCountry?: Country) => {
      dispatch(profileActions.updateProfile({ country: newCountry }));
    },
    [dispatch],
  );

  return (
    <DynamicReducer reducers={reducers} removeAfterUnmount={false}>
      <VStack gap="16" maxWidth className={className} align="center">
        <EditableProfileHeader />

        {validateErrors?.length &&
          validateErrors.map((err) => (
            <Text
              key={err}
              variant="error"
              text={validateErrorsTranslates[err]}
              data-testid="EditableProfileCard.Error"
            />
          ))}

        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </VStack>
    </DynamicReducer>
  );
});
