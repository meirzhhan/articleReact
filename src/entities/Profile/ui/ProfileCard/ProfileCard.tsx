import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { Profile } from '../../model/types/profile';

import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { toggleFeatures } from '@/shared/lib/hooks/useToggleFeatures';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency?: Currency) => void;
  onChangeCountry?: (country?: Country) => void;
}

const SkeletonForInput = () => (
  <Skeleton width="100%" height={38} border="20px" />
);

/**
 * Компонент ProfileCard для отображения и редактирования профиля пользователя.
 *
 * @param {ProfileCardProps} props - Свойства компонента.
 * @returns {JSX.Element} JSX-элемент, представляющий карточку профиля.
 */

export const ProfileCard = (props: ProfileCardProps): JSX.Element => {
  const {
    isLoading,
    error,
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props;
  const { t } = useTranslation('profile');

  const ProfileSkeleton = (
    <Card padding="24" border="partial" maxWidth flexColumn gap="32">
      <HStack maxWidth justify="center">
        <Skeleton border="50%" width={128} height={128} />
      </HStack>

      <HStack gap="24" maxWidth>
        {[1, 2].map((index) => (
          <VStack key={index} gap="16" maxWidth>
            {[1, 2, 3, 4].map((index) => (
              <SkeletonForInput key={index} />
            ))}
          </VStack>
        ))}
      </HStack>
    </Card>
  );

  const ProfileError = (
    <HStack justify={'center'} maxWidth>
      <Text
        variant="error"
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте обновить страницу')}
        align="center"
      />
    </HStack>
  );

  if (isLoading) return ProfileSkeleton;
  if (error) return ProfileError;

  return (
    <Card
      padding="24"
      border="partial"
      maxWidth
      className={className}
      flexColumn
      gap="32"
    >
      {data?.avatar && (
        <HStack justify={'center'} maxWidth>
          <Avatar size={128} src={data?.avatar} />
        </HStack>
      )}

      <HStack gap="24" maxWidth>
        <VStack gap="16" maxWidth>
          <Input
            value={data?.first}
            label={t('Имя')}
            onChange={onChangeFirstname}
            readonly={readonly}
            data-testid="ProfileCard.firstname"
          />
          <Input
            value={data?.lastname}
            label={t('Фамилия')}
            onChange={onChangeLastname}
            readonly={readonly}
            {...(process.env.NODE_ENV === 'development' && {
              'data-testid': 'ProfileCard.lastname',
            })}
          />
          <Input
            value={data?.age}
            label={t('Возраст')}
            onChange={onChangeAge}
            readonly={readonly}
          />
          <Input
            value={data?.city}
            label={t('Город')}
            onChange={onChangeCity}
            readonly={readonly}
          />
        </VStack>

        <VStack gap="16" maxWidth>
          <Input
            value={data?.username}
            label={t('Логин')}
            onChange={onChangeUsername}
            readonly={toggleFeatures({
              name: 'isEditLoginEnabled',
              on: () => readonly,
              off: () => true,
            })}
          />
          <Input
            value={data?.avatar}
            label={t('Аватар')}
            onChange={onChangeAvatar}
            readonly={toggleFeatures({
              name: 'isEditAvatarEnabled',
              on: () => readonly,
              off: () => true,
            })}
          />
          <CurrencySelect
            value={data?.currency}
            onChange={onChangeCurrency}
            readonly={readonly}
          />
          <CountrySelect
            value={data?.country}
            onChange={onChangeCountry}
            readonly={readonly}
          />
        </VStack>
      </HStack>
    </Card>
  );
};
