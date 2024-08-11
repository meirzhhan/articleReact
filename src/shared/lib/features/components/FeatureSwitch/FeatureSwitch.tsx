import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { getFeatureFlag } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { FeatureFlags } from './../../../../types/featureFlags';
import { Skeleton } from '@/shared/ui/Skeleton';

interface FeatureSwitchProps {
  className?: string;
  feature: keyof FeatureFlags;
  featureLabel: string;
  isLoading: boolean;
  onChangeFeature: (value: string, feature: keyof FeatureFlags) => void;
}

export const FeatureSwitch = memo((props: FeatureSwitchProps) => {
  const { className, feature, featureLabel, onChangeFeature, isLoading } =
    props;

  const isFeatureEnabled = getFeatureFlag(feature);

  const items = [
    {
      content: 'Включить',
      value: 'new',
    },
    {
      content: 'Отключить',
      value: 'old',
    },
  ];

  const onChange = useCallback((value: string) => {
    onChangeFeature(value, feature);
  }, []);

  if (1) {
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
        onChange={onChange}
        items={items}
        value={isFeatureEnabled ? 'new' : 'old'}
        className={className}
      />
    </HStack>
  );
});
