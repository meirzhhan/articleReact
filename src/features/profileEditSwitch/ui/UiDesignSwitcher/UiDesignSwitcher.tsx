import { memo, useState } from 'react';
import { updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { FeatureSwitch } from '@/shared/lib/features/components/FeatureSwitch/FeatureSwitch';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useTranslation } from 'react-i18next';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

interface UiDesignSwitcherProps {
  className?: string;
}

// TODO: isAppRedesigned => language

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const s: { feature: keyof FeatureFlags; featureLabel: string }[] = [
    {
      feature: 'isProfileEditEnabled',
      featureLabel: t('Редактирование профиля'),
    },
    {
      feature: 'isAddCommentEnabled',
      featureLabel: t('Комментирование статьи'),
    },
  ];

  const onChange = async (value: string, feature: keyof FeatureFlags) => {
    if (authData) {
      setIsLoading(true);

      await dispatch(
        updateFeatureFlag({
          newFeatures: {
            [feature]: value === 'new',
          },
          userId: authData.id,
        }),
      ).unwrap();

      setIsLoading(false);
    }
  };

  return (
    <Card padding="24" border="partial" columnGap="32">
      <Text title={t('Настройки пользователя')} />

      <VStack gap="24">
        {s.map((xd) => (
          <FeatureSwitch
            isLoading={isLoading}
            feature={xd.feature}
            featureLabel={xd.featureLabel}
            onChangeFeature={onChange}
          />
        ))}
      </VStack>
    </Card>
  );
});
