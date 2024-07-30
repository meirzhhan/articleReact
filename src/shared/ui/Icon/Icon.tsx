import { useClassName } from '@/shared/lib/hooks/useClassName';
import { memo } from 'react';
import cl from './Icon.module.scss';

// onclick type removes
type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface NotClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable?: true;
  onClick: () => void;
}

type IconProps = NotClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    width = 32,
    height = 32,
    clickable,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      className={useClassName(cl.Icon, {}, [className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable)
    return (
      <button
        className={cl.button}
        type="button"
        onClick={props.onClick}
        style={{ height, width }}
      >
        {icon}
      </button>
    );

  return icon;
});
