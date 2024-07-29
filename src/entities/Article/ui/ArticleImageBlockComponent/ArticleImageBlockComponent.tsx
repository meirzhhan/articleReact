import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleImageBlock } from '../../model/types/article';
import { Text } from '@/shared/ui/redesigned/Text';
import cl from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    return (
      <div
        className={classNames(cl.ArticleImageBlockComponent, {}, [className])}
      >
        <img src={block.src} alt={block.title} className={cl.img} />
        {block.title && <Text text={block.title} align="center" />}
      </div>
    );
  },
);
