import { CSSProperties, useMemo } from 'react';

import { customCl } from '@/shared/lib/hooks/useClassName';

import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import { AppImage } from '../AppImage';
import UserIcon from '../../assets/icons/avatar.svg';
import cl from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string; // URL изображения для аватара
  size?: number; // Размер аватара в пикселях.
  alt?: string;
}

/**
 * Компонент `Avatar` отображает изображение аватара пользователя.
 * Использует компонент `AppImage` для обработки загрузки, ошибок и отображения резервных изображений.
 *
 * @param {AvatarProps} props - Пропсы компонента.
 * @returns {JSX.Element} - Рендерит аватар с заданными размерами, стилями и fallback-изображениями.
 */

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { className, src, size = 100, alt } = props;

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
      className={customCl(cl.Avatar, {}, [className])}
    />
  );
};
