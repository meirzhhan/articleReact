import { memo, useCallback } from 'react';

import { useClassName } from '@/shared/lib/hooks/useClassName';
import CopyIconNew from '@/shared/assets/icons/copyNew.svg';

import { Icon } from '../Icon';
import cl from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

/**
 * Компонент `Code` отображает текст в виде кода с возможностью его копирования.
 *
 * @param {CodeProps} props - Пропсы компонента.
 * @returns {JSX.Element} - Рендерит текст в формате кода и иконку для копирования.
 */

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={useClassName(cl.Code, {}, [className])}>
      <code>{text}</code>
      <Icon
        clickable
        onClick={onCopy}
        className={cl.Code__copyBtn}
        Svg={CopyIconNew}
      />
    </pre>
  );
});
