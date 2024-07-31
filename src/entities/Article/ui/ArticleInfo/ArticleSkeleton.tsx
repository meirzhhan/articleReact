import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';

export const ArticleSkeletonBig = (
  <VStack gap="16">
    <Skeleton width={250} border="12px" />
    <Skeleton width={400} height={32} border="12px" />
    <Skeleton width={765} height={395} border="12px" />
    <Skeleton width={400} border="12px" />
    <Skeleton width={765} height={100} border="12px" />
  </VStack>
);
