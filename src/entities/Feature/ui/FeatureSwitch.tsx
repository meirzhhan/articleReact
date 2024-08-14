import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox, ListBoxItem } from '@/shared/ui/Popups';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { FeatureFlags, FeatureProps } from '@/shared/types/featureFlags';

import { getFeatureFlag } from '../model/services/setGetFeatures';

interface FeatureSwitchProps extends FeatureProps {
  className?: string;
  isLoading: boolean;
  onChangeFeature: (value: string, feature: keyof FeatureFlags) => void;
}

/**
 * Компонент `FeatureSwitch` отображает переключатель для функции, который позволяет пользователю
 * включать или отключать feature.
 *
 * @param {FeatureSwitchProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент переключателя функции.
 */

export const FeatureSwitch = memo((props: FeatureSwitchProps) => {
  const {
    className,
    featureLabel,
    isLoading,
    featureKey,
    onChangeFeature,
    readonly,
  } = props;
  const { t } = useTranslation('settings');

  const isFeatureEnabled = getFeatureFlag(featureKey);

  const items: ListBoxItem<string>[] = [
    {
      content: t('Включено'),
      value: 'enable',
    },
    {
      content: t('Отключено'),
      value: 'disable',
    },
  ];

  const onChangeHandler = useCallback(
    (value: string) => {
      onChangeFeature(value, featureKey);
    },
    [featureKey, onChangeFeature],
  );

  if (isLoading) {
    return (
      <HStack gap="16">
        <Skeleton width={205} height={32} border="12px" />
        <Skeleton width={100} height={32} border="24px" />
      </HStack>
    );
  }
  return (
    <HStack gap="16">
      <Text text={featureLabel} bold />
      <ListBox
        direction="bottom left"
        onChange={onChangeHandler}
        items={items}
        value={isFeatureEnabled ? 'enable' : 'disable'}
        className={className}
        readonly={readonly}
      />
    </HStack>
  );
});
