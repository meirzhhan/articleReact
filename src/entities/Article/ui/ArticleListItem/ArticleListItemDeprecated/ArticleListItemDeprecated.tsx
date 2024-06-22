import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlock } from '../../../model/types/article';
import {
  ArticleView,
  ArticleBlockType,
} from '../../../model/consts/articleConsts';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';

import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';

import cl from '../ArticleListItem.module.scss';
import EyeIcon from '@/shared/assets/icons/eye.svg';

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
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
        data-testid="ArticleListItem"
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
            fallback={<Skeleton width="100%" height={250} />}
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
      data-testid="ArticleListItem"
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
