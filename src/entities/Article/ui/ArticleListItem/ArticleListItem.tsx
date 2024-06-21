import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import cl from './ArticleListItem.module.scss';
import { Article, ArticleTextBlock } from '../../model/types/article';
import {
  ArticleView,
  ArticleBlockType,
} from '../../model/consts/articleConsts';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const types = <Text text={article.type.join(', ')} className={cl.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cl.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div
        className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
      >
        <Card className={cl.card}>
          <div className={cl.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cl.username} />
            <Text text={article.createdAt} className={cl.date} />
          </div>
          <Text title={article.title} className={cl.title} />
          {types}
          <AppImage
            fallback={<Skeleton width={'100%'} height={250} />}
            src={article.img}
            className={cl.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cl.textBlock}
            />
          )}
          <div className={cl.footer}>
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button theme={ButtonTheme.OUTLINE}>{t('Читать далее')}</Button>
            </AppLink>

            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
    >
      <Card className={cl.card}>
        <div className={cl.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            alt={article.title}
            src={article.img}
            className={cl.img}
          />
          <Text text={article.createdAt} className={cl.date} />
        </div>
        <div className={cl.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cl.title} />
      </Card>
    </AppLink>
  );
});
