import { useClassName } from '@/shared/lib/hooks/useClassName';

import { memo } from 'react';
import cl from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={useClassName(cl.Overlay, {}, [className])}
    />
  );
});
