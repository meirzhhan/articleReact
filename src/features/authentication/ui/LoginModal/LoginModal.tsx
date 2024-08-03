import { Suspense } from 'react';

import { Modal } from '@/shared/ui/Modal';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean; // Флаг для управления видимостью модального окна
  onClose: () => void; // Функция, вызываемая при закрытии модального окна
}

/**
 * Компонент для отображения модального окна входа.
 * @param {LoginModalProps} props - Свойства компонента.
 * @returns {JSX.Element} - Возвращает JSX элемент.
 */

export const LoginModal = (props: LoginModalProps): JSX.Element => {
  const { className, isOpen, onClose } = props;

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onClose={onClose}
      lazy // Ленивое (lazy) подгружение содержимого
    >
      <Suspense fallback={<></>}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
