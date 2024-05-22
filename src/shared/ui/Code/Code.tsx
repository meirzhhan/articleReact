import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo, useCallback } from 'react';
import cl from './Code.module.scss';
import { Button, ButtonTheme } from '../Button/Button';
import CopyIcon from 'shared/assets/icons/copy.svg';

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
    <pre className={classNames(cl.Code, {}, [className])}>
      <Button onClick={onCopy} className={cl.copyBtn} theme={ButtonTheme.CLEAR}>
        <CopyIcon className={cl.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
