import { memo } from 'react';

import { Text } from '@/shared/ui/Text';
import { useClassName } from '@/shared/lib/hooks/useClassName';

import { ArticleImageBlock } from '../../model/types/article';
import cl from './ImageBlock.module.scss';

interface ImageBlockProps {
  className?: string;
  block: ArticleImageBlock;
}

/**
 * Компонент для отображения блока изображения в статье.
 *
 * @param {ImageBlockProps} props - Свойства компонента.
 * @returns {JSX.Element} - Компонент для отображения блока изображения.
 */

export const ImageBlock = memo((props: ImageBlockProps) => {
  const { className, block } = props;

  return (
    <div
      className={useClassName(cl.ArticleImageBlockComponent, {}, [className])}
    >
      <img src={block.src} alt={block.title} className={cl.img} />
      {block.title && <Text text={block.title} align="center" />}
    </div>
  );
});
