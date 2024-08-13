import { ReactNode } from 'react';

import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { customCl, Mods } from '@/shared/lib/hooks/useClassName';

import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import cl from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

/**
 * Компонент модального окна.
 * Модальное окно может быть лениво загружено (монтироваться только при необходимости)
 *
 * @param {ModalProps} props - Пропсы компонента Modal.
 * @returns {JSX.Element | null} - Возвращает JSX элемент для модального окна или null, если модальное окно должно быть скрыто.
 */

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  const { theme } = useTheme();

  const mods: Mods = {
    [cl.opened]: isOpen,
    [cl.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={customCl(cl.Modal, mods, [className, theme, 'app_modal'])}
      >
        <Overlay onClick={close} />
        <div className={cl.Modal__content}>{children}</div>
      </div>
    </Portal>
  );
};
