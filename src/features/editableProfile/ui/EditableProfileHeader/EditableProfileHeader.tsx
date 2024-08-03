import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';

interface EditableProfileHeaderProps {
  className?: string;
}

/**
 * Компонент `EditableProfileHeader` отображает заголовок редактируемой карточки профиля.
 * Позволяет пользователю редактировать, отменять изменения и сохранять изменения профиля.
 *
 * @param {EditableProfileHeaderProps} props - Свойства компонента.
 * @returns {JSX.Element} - Возвращает элемент заголовка редактируемой карточки профиля.
 */

export const EditableProfileHeader = memo(
  (props: EditableProfileHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();

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

    return (
      <Card padding="24" max border="partial">
        <HStack justify={'between'} className={className}>
          <Text title={t('Профиль')} />
          {canEdit && (
            <>
              {readonly ? (
                <Button
                  onClick={onEdit}
                  data-testid={'EditableProfileCardHeader.EditButton'}
                >
                  {t('Редактировать')}
                </Button>
              ) : (
                <HStack gap={'8'}>
                  <Button
                    onClick={onCancelEdit}
                    data-testid={'EditableProfileCardHeader.CancelButton'}
                  >
                    {t('Отменить')}
                  </Button>
                  <Button
                    onClick={onSave}
                    color="success"
                    data-testid={'EditableProfileCardHeader.SaveButton'}
                  >
                    {t('Сохранить')}
                  </Button>
                </HStack>
              )}
            </>
          )}
        </HStack>
      </Card>
    );
  },
);
