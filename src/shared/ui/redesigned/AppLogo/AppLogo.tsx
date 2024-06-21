import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './AppLogo.module.scss';
import { HStack } from '../../deprecated/Stack';
import AppSvg from '@/shared/assets/icons/app-logo.svg';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className, size = 50 } = props;

  return (
    <HStack
      max
      justify="center"
      className={classNames(cl.appLogoWrapper, {}, [className])}
    >
      <div className={cl.gradientBig} />
      <div className={cl.gradientSmall} />
      <AppSvg width={size} height={size} color="black" className={cl.appLogo} />
    </HStack>
  );
});
