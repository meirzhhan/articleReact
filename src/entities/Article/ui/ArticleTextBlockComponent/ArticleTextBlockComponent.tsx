import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cl from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { Text } from '@/shared/ui/Text';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    return (
      <div
        className={classNames(cl.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && <Text title={block.title} className={cl.title} />}

        {block.paragraphs.map((paragraph, index) => (
          <Text key={index} text={paragraph} className={cl.paragraph} />
        ))}
      </div>
    );
  },
);
