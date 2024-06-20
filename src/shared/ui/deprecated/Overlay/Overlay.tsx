import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

/**
 * new UI kit added
 * @deprecated
 */

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(cl.Overlay, {}, [className])}
    />
  );
});
