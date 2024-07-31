import { CodeBlock } from '../CodeBlock/CodeBlock';
import { TextBlock } from '../TextBlock/ArticleTextBlockComponent';
import { ImageBlock } from '../ImageBlock/ImageBlock';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { ArticleBlock } from '../../model/types/article';

/**
 * Компонент для рендеринга блоков статьи.
 *
 * @param {ArticleBlock} block - Данные блока статьи.
 * @returns {JSX.Element | null} - Компонент для отображения блока статьи.
 */

export const RenderBlocks = (
  block: ArticleBlock,
  index: number,
): JSX.Element | null => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <CodeBlock key={index} block={block} />;
    case ArticleBlockType.IMAGE:
      return <ImageBlock key={index} block={block} />;
    case ArticleBlockType.TEXT:
      return <TextBlock key={index} block={block} />;

    default:
      return null;
  }
};
