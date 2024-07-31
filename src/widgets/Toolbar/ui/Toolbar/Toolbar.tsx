import { memo } from 'react';

import { ScrollToTopButton } from '@/features/scrollToTopButton/ui/ScrollToTopButton/ScrollToTopButton';

import { VStack } from '@/shared/ui/Stack';

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
      <ScrollToTopButton />
    </VStack>
  );
});
