import { memo } from 'react';

import { Icon } from '@/shared/ui/Icon';
import topButtonIcon from '@/shared/assets/icons/topButton.svg';

interface ScrollToTopTriggerProps {
  className?: string;
}

/**
 * Кнопка для прокрутки страницы вверх.
 *
 * @param {ScrollToTopButtonProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент кнопки, прокручивающий страницу вверх при клике.
 */

export const ScrollToTopTrigger = memo((props: ScrollToTopTriggerProps) => {
  const { className } = props;

  // Прокручивает страницу вверх при клике на кнопку.
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      className={className}
      clickable
      Svg={topButtonIcon}
      height={32}
      width={32}
      onClick={onClick}
    />
  );
});
