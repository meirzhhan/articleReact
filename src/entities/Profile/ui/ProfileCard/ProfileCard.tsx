import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cl from './ProfileCard.module.scss';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(cl.ProfileCard, {}, [className])}>
      <div className={cl.header}>
        <Text title={t('Профиль')} />
        <Button className={cl.editBtn} theme={ButtonTheme.OUTLINE}>
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cl.data}>
        <Input
          value={data?.first}
          placeholder={t('Имя')}
          className={cl.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Фамилия')}
          className={cl.input}
        />
      </div>
    </div>
  );
};
