import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import topButtonIcon from '@/shared/assets/icons/topButton.svg';
import cl from './ScrollToTopButton.module.scss';

interface scrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: scrollToTopButtonProps) => {
  const { className } = props;

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      Svg={topButtonIcon}
      onClick={onClick}
      height={32}
      width={32}
      clickable
      className={classNames(cl.scrollToTopButton, {}, [className])}
    />
  );
});
