import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode, memo } from 'react';
import cl from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    theme = CardTheme.NORMAL,
    ...otherProps
  } = props;
  return (
    <div
      className={classNames(cl.Card, {}, [className, cl[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
