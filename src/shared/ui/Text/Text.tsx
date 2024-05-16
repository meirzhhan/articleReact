import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cl from './Text.module.scss';
import { memo } from 'react';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
  } = props;

  const mods: Mods = {
    [cl[theme]]: true,
    [cl[align]]: true,
  };

  return (
    <div className={classNames(cl.Text, mods, [className])}>
      {title && <p className={cl.title}>{title}</p>}
      {text && <p className={cl.text}>{text}</p>}
    </div>
  );
});
