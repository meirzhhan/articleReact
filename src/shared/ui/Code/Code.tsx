import { memo, useCallback } from 'react';

import { customCl } from '@/shared/lib/hooks/useClassName';
import CopyIconNew from '@/shared/assets/icons/copyButton.svg';

import { Icon } from '../Icon';
import { Card } from '../Card';
import cl from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string; // Код
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
    <Card padding="16" variant="light" border="default">
      <pre className={customCl(cl.Code, {}, [className])}>
        <code>{text}</code>
        <Icon
          clickable
          onClick={onCopy}
          className={cl.copyBtn}
          Svg={CopyIconNew}
        />
      </pre>
    </Card>
  );
});
