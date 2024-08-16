import { ReactNode } from 'react';

import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { customCl, Mods } from '@/shared/lib/hooks/useClassName';

import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import cl from './Modal.module.scss';
import { Card } from '../Card';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

/**
 * Компонент модального окна, который отображает всплывающее окно поверх основного содержимого.
 * Модальное окно может быть лениво загружено, т.е. монтироваться только при необходимости.
 *
 * @param {boolean} [props.isOpen=false] - Флаг, определяющий, открыто ли модальное окно. По умолчанию `false`.
 * @param {() => void} [props.onClose] - Функция обратного вызова, которая вызывается при закрытии модального окна.
 * @param {boolean} [props.lazy=false] - Флаг, указывающий, должно ли модальное окно загружаться лениво.
 *
 * @returns {JSX.Element | null} - Возвращает JSX элемент для модального окна, если оно открыто. Если `lazy` равно `true` и модальное окно не смонтировано, возвращает `null`.
 */
export const Modal = (props: ModalProps): JSX.Element | null => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  const mods: Mods = {
    [cl.open]: isOpen,
    [cl.closing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div className={customCl(cl.Modal, mods, [className, 'app_modal'])}>
        <Overlay onClick={close} />
        <Card className={cl.content} padding="24" border="round">
          {children}
        </Card>
      </div>
    </Portal>
  );
};
