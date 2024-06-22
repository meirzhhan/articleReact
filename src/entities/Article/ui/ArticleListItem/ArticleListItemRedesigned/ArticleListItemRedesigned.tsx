import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlock } from '../../../model/types/article';
import {
  ArticleBlockType,
  ArticleView,
} from '../../../model/consts/articleConsts';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';

import cl from './ArticleListItemRedesigned.module.scss';
import EyeIcon from '@/shared/assets/icons/eyeNew.svg';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const types = <Text text={article.type.join(', ')} className={cl.types} />;
  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cl.views} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        padding="24"
        max
        className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
        data-testid="ArticleListItem"
      >
        <VStack max gap="16">
          <HStack gap="8" max>
            <Avatar size={32} src={article.user.avatar} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} bold size="s" />
          <AppImage
            fallback={<Skeleton width={'100%'} height={250} />}
            src={article.img}
            className={cl.img}
            alt={article.title}
          />

          {textBlock.paragraphs && (
            <Text
              className={cl.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(' ')}
            />
          )}
          <HStack max justify="between">
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button variant="outline">{t('Читать далее')}</Button>
            </AppLink>

            {views}
          </HStack>
        </VStack>
      </Card>
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
