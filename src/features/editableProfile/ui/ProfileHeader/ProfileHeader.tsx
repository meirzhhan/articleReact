import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { ToggleFeatures } from '@/shared/lib/components/ToggleFeatures';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getRouteSettings } from '@/shared/consts/router';
import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
  className?: string;
}

/**
 * Компонент `EditableProfileHeader` отображает заголовок редактируемой карточки профиля.
 * Позволяет пользователю редактировать, отменять изменения и сохранять изменения профиля.
 *
 * @param {ProfileHeaderProps} props - Свойства компонента.
 * @returns {JSX.Element} - Возвращает элемент заголовка редактируемой карточки профиля.
 */

export const ProfileHeader = memo((props: ProfileHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const readonly = useSelector(getProfileReadonly);

  const canEdit = authData?.id === profileData?.id;

  /**
   * Обработчик нажатия на кнопку "Редактировать".
   * Переключает профиль в режим редактирования если canEdit = true (Если профиль ваш).
   */
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  /**
   * Обработчик нажатия на кнопку "Отменить".
   * Отменяет режим редактирования и сбрасывает изменения.
   */
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  /**
   * Обработчик нажатия на кнопку "Сохранить".
   * Сохраняет изменения профиля если валидация успешная.
   */
  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const enabledFeature = canEdit && (
    <>
      {readonly ? (
        <Button
          onClick={onEdit}
          variant="filled"
          {...(process.env.NODE_ENV === 'development' && {
            'data-testid': 'EditableProfileCardHeader.EditButton',
          })}
        >
          {t('Редактировать')}
        </Button>
      ) : (
        <HStack gap={'8'}>
          <Button
            variant="filled"
            onClick={onCancelEdit}
            color="error"
            {...(process.env.NODE_ENV === 'development' && {
              'data-testid': 'EditableProfileCardHeader.CancelButton',
            })}
          >
            {t('Отменить')}
          </Button>
          <Button
            variant="filled"
            onClick={onSave}
            color="success"
            {...(process.env.NODE_ENV === 'development' && {
              'data-testid': 'EditableProfileCardHeader.SaveButton',
            })}
          >
            {t('Сохранить')}
          </Button>
        </HStack>
      )}
    </>
  );
  const disabledFeature = (
    <Button onClick={() => navigate(getRouteSettings())}>
      {t('Включите редактирование в настройках')}
    </Button>
  );

  return (
    <Card padding="24" maxWidth border="partial">
      <HStack justify={'between'} className={className}>
        <Text title={t('Профиль')} />
        <ToggleFeatures
          feature="isProfileEditEnabled"
          on={<>{enabledFeature}</>}
          off={disabledFeature}
        />
      </HStack>
    </Card>
  );
});
