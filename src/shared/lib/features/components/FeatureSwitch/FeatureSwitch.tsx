import { memo } from 'react';
import { ListBox } from '@/shared/ui/Popups';
// import { getFeatureFlag } from '@/shared/lib/features';
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
  const { className, featureLabel, isLoading } = props;

  // const isFeatureEnabled = getFeatureFlag(feature);
  const isFeatureEnabled = false;

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

  // const onChange = useCallback((value: string) => {
  //   onChangeFeature(value, feature);
  // }, []);
  const onChange = () => {}; // временно ничего не делает

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
        onChange={onChange}
        items={items}
        value={isFeatureEnabled ? 'new' : 'old'}
        className={className}
      />
    </HStack>
  );
});
