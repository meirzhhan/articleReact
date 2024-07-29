import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cl from './Avatar.module.scss';
import { CSSProperties, useMemo } from 'react';
import UserIcon from '../../assets/icons/user-default.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import { AppImage } from '../AppImage';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, size = 100, alt } = props;
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const fallback = <Skeleton width={size} height={size} border={'50%'} />;
  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cl.Avatar, mods, [className])}
    />
  );
};
