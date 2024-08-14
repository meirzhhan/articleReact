import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';
import { FeatureSwitch, updateFeatureFlag } from '@/entities/Feature';

import { VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { FeatureFlags, FeatureProps } from '@/shared/types/featureFlags';

/**
 * Компонент `SettingsFeatures` отображает интерфейс для переключения feature.
 * Он отображает переключатели и позволяет пользователю включать или отключать их.
 *
 * @returns {JSX.Element} Компонент для переключения функций в дизайне.
 */

export const SettingsFeatures = memo(() => {
  const { t } = useTranslation('settings');
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const features: FeatureProps[] = [
    {
      featureKey: 'isProfileEditEnabled',
      featureLabel: t('Редактирование профиля'),
      readonly: true,
    },
    {
      featureKey: 'isAddCommentEnabled',
      featureLabel: t('Комментирование статьи'),
      readonly: false,
    },
  ];

  /**
   * Обработчик изменения функции. Обновляет состояние функции в пользовательских настройках.
   *
   * @param {string} value - Новое значение функции ("enable" или "disable").
   * @param {keyof FeatureFlags} featureKey - Ключ функции, которую нужно обновить.
   */
  const onChangeFeature = async (
    value: string,
    featureKey: keyof FeatureFlags,
  ) => {
    if (authData) {
      setIsLoading(true);

      await dispatch(
        updateFeatureFlag({
          newFeatures: {
            [featureKey]: value === 'enable',
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
        {features.map((obj, index) => (
          <FeatureSwitch
            key={index}
            isLoading={isLoading}
            featureKey={obj.featureKey}
            featureLabel={obj.featureLabel}
            onChangeFeature={onChangeFeature}
            readonly={obj.readonly}
          />
        ))}
      </VStack>
    </Card>
  );
});
