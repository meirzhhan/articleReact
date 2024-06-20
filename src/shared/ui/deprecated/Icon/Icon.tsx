import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

/**
 * new UI kit added
 * @deprecated
 */

export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted, ...otherProps } = props;
  return (
    <Svg
      className={classNames(inverted ? cl.inverted : cl.Icon, {}, [className])}
      {...otherProps}
    />
  );
});
