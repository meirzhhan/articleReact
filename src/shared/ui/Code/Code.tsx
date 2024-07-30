import { customCl } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';

import CopyIconNew from '@/shared/assets/icons/copyNew.svg';
import cl from './Code.module.scss';
import { Icon } from '../Icon';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={customCl(cl.CodeRedesigned, {}, [className])}>
      <Icon
        clickable
        onClick={onCopy}
        className={cl.copyBtn}
        Svg={CopyIconNew}
      />
      <code>{text}</code>
    </pre>
  );
});
