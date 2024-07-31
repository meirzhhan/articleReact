import { memo } from 'react';

import { Text } from '@/shared/ui/Text';

import { ArticleTextBlock } from '../../model/types/article';
import cl from './ArticleTextBlockComponent.module.scss';

interface TextBlockProps {
  className?: string;
  block: ArticleTextBlock;
}

/**
 * Компонент для отображения текстового блока в статье.
 *
 * @param {TextBlockProps} props - Свойства компонента.
 * @returns {JSX.Element} - Компонент для отображения текстового блока.
 */

export const TextBlock = memo((props: TextBlockProps) => {
  const { className, block } = props;

  return (
    <>
      {block.title && <Text title={block.title} className={cl.title} />}

      {block.paragraphs.map((paragraph, index) => (
        <Text key={index} text={paragraph} className={cl.paragraph} />
      ))}
    </>
  );
});
