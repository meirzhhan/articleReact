import { customCl } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './Toolbar.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton/ui/ScrollToTopButton/ScrollToTopButton';

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
      className={customCl(cl.Toolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
