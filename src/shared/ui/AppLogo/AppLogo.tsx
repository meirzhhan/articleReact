import { memo } from 'react';

import AppSvg from '@/shared/assets/icons/app-logo.svg';
import { useClassName } from '@/shared/lib/hooks/useClassName';

import { HStack } from '../Stack';
import cl from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

/**
 * Компонент `AppLogo` отображает логотип приложения.
 * Использует SVG-иконку и стили для визуального оформления.
 *
 * @param {AppLogoProps} props - Пропсы компонента.
 * @returns {JSX.Element} - Рендерит логотип приложения с заданными размерами и стилями.
 */

export const AppLogo = memo((props: AppLogoProps) => {
  const { className, size = 50 } = props;

  return (
    <HStack
      max
      justify="center"
      className={useClassName(cl.wrapper, {}, [className])}
    >
      <AppSvg width={size} height={size} color="black" className={cl.appLogo} />
      <div className={cl.gradientBig} />
      <div className={cl.gradientSmall} />
    </HStack>
  );
});
