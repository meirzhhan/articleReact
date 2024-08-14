import { memo } from 'react';

import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

import { Card } from '@/shared/ui/Card';

import { MainLayout } from '../MainLayout';
import cl from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => {
  return (
    <MainLayout
      header={
        <VStack align="end">
          <Card padding="16" headersStyle columnGap="8">
            <Skeleton width={40} height={40} border="50%" />
            <Skeleton width={24} height={40} border="12px" />
          </Card>
        </VStack>
      }
      content={
        // <VStack gap="16">
        //   <Skeleton width="100%" height={500} border="16px" />
        // </VStack>
        <></>
      }
      sidebar={<Skeleton className={cl.skeleton} width={180} height={'100%'} />}
    />
  );
});
