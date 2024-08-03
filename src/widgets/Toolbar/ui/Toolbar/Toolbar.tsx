import { memo } from 'react';

import { VStack } from '@/shared/ui/Stack';
import { ScrollToTopTrigger } from '@/features/scrollToTopTrigger';

interface ToolbarProps {
  className?: string;
}

export const Toolbar = memo((props: ToolbarProps) => {
  const { className } = props;

  return (
    <VStack
      className={className}
      justify="center"
      align="center"
      maxWidth
      maxHeight
    >
      <ScrollToTopTrigger />
    </VStack>
  );
});
