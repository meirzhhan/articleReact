import { CSSProperties, memo } from 'react';

import { customCl } from '@/shared/lib/hooks/useClassName';
import cl from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

/**
 * Компонент Skeleton, используется для отображения заглушек контента.
 *
 * @param {SkeletonProps} props - Пропсы компонента Skeleton.
 * @returns {JSX.Element} - Возвращает элемент скелета с указанными стилями.
 */

export const Skeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div className={customCl(cl.Skeleton, {}, [className])} style={styles} />
  );
});
