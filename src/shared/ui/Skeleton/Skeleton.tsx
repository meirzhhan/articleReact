import { useClassName } from '@/shared/lib/hooks/useClassName';
import { CSSProperties, memo } from 'react';
import cl from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div
      className={useClassName(cl.Skeleton, {}, [className])}
      style={styles}
    />
  );
});
