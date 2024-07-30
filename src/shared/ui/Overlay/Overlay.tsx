import { memo } from 'react';

import { useClassName } from '@/shared/lib/hooks/useClassName';
import cl from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Компонент Overlay, который используется для создания затемненного фона за модальным окном
 *
 * @param {OverlayProps} props - Пропсы компонента Overlay.
 * @returns {JSX.Element} - Возвращает JSX элемент для Overlay.
 */

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={useClassName(cl.Overlay, {}, [className])}
    />
  );
});
