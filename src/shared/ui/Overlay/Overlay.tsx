import { customCl } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div onClick={onClick} className={customCl(cl.Overlay, {}, [className])} />
  );
});
