import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/icons/app-logo.svg';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className } = props;

  return (
    <HStack
      max
      justify="center"
      className={classNames(cl.appLogoWrapper, {}, [className])}
    >
      <div className={cl.gradientBig} />
      <div className={cl.gradientSmall} />
      {/* <Icon /> TODO: */}
      <AppSvg className={cl.appLogo} />
    </HStack>
  );
});
