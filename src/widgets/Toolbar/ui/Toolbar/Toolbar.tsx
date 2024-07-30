import { memo } from 'react';
import cl from './Toolbar.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton/ui/ScrollToTopButton/ScrollToTopButton';
import { useClassName } from '@/shared/lib/hooks/useClassName';

interface ToolbarProps {
  className?: string;
}

export const Toolbar = memo((props: ToolbarProps) => {
  const { className } = props;

  return (
    <VStack
      justify="center"
      align="center"
      max
      className={useClassName(cl.Toolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
