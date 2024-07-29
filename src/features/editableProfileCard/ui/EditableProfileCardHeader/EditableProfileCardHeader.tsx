import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <Card padding="24" max border="partial">
        <HStack
          max
          justify={'between'}
          className={classNames('', {}, [className])}
        >
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
                    color="error"
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
