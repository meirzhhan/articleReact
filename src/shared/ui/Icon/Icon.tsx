import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted } = props;
  return (
    <Svg
      className={classNames(inverted ? cl.inverted : cl.Icon, {}, [className])}
    />
  );
});
