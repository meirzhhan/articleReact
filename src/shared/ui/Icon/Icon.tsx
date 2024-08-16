import { memo } from 'react';

import { customCl } from '@/shared/lib/hooks/useClassName';
import cl from './Icon.module.scss';

// Тип для пропсов SVG, исключая `onClick`
type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>; // Компонент SVG, который будет использоваться для отображения иконки.
}

// Не кликабельная иконка кликабельна. (button)
interface NotClickableIconProps extends IconBaseProps {
  clickable?: false;
}

// Кликабельная иконка кликабельна.
interface ClickableIconProps extends IconBaseProps {
  clickable?: true;
  onClick: () => void;
}

type IconProps = NotClickableIconProps | ClickableIconProps;

/**
 * Компонент для отображения иконки.
 * В зависимости от пропса `clickable`, иконка может быть отображена как обычный элемент SVG или как кнопка.
 *
 * @param {IconProps} props - Пропсы компонента иконки.
 * @returns {JSX.Element} - Возвращает JSX элемент, который представляет собой иконку.
 */

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
      className={customCl(cl.Icon, {}, [className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  // Если иконка кликабельна - оборачивается в кнопку
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
