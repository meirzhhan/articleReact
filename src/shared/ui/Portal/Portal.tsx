import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

/**
 * Компонент Portal, используется для создания портала, который находится вне DOM родительского компонента
 *
 * @param {PortalProps} props - Пропсы компонента Portal.
 * @returns {React.ReactPortal} - Возвращает React портал, который рендерит дочерние элементы в указанный DOM элемент.
 */

export const Portal = (props: PortalProps) => {
  const { children, element = document.body } = props;

  return createPortal(children, element);
};
