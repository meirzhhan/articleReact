import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';

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

  const isAppRedesigned = getFeatureFlag('isAppRedesigned');

  const items = [
    {
      content: t('Новый'),
      value: 'new',
    },
    {
      content: t('Старый'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);

      await dispatch(
        updateFeatureFlag({
          newFeatures: {
            isAppRedesigned: value === 'new',
          },
          userId: authData.id,
        }),
      ).unwrap();

      setIsLoading(false);
    }
  };

  return (
    <HStack>
      <Text text={t('Дизайн интерфейса')} />
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          onChange={onChange}
          items={items}
          value={isAppRedesigned ? 'new' : 'old'}
          className={className}
        />
      )}
    </HStack>
  );
});
