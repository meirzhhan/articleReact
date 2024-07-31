import { memo } from 'react';

import { Code } from '@/shared/ui/Code';
import { useClassName } from '@/shared/lib/hooks/useClassName';

import { ArticleCodeBlock } from '../../model/types/article';
import cl from './CodeBlock.module.scss';

interface CodeBlockProps {
  className?: string;
  block: ArticleCodeBlock;
}

/**
 * Компонент для отображения блока кода в статье.
 *
 * @param {CodeBlockProps} props - Свойства компонента.
 * @returns {JSX.Element} - Компонент для отображения блока кода.
 */

export const CodeBlock = memo((props: CodeBlockProps) => {
  const { className, block } = props;

  return (
    <div className={useClassName(cl.Code, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
});
