import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink';
import { useClassName } from '@/shared/lib/hooks/useClassName';
import { getRouteArticleDetails } from '@/shared/consts/router';
import EyeIcon from '@/shared/assets/icons/eyeNew.svg';

import { Article, ArticleTextBlock } from '../../model/types/article';
import {
  ArticleBlockType,
  ArticleView,
} from '../../model/consts/articleConsts';
import cl from './ArticleListItem.module.scss';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

/**
 * Компонент для отображения статьи в виде карточки.
 *
 * @param {ArticleListItemProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент.
 */

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} />
      <Text bold text={article.user.username} />
    </>
  );

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cl.views} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textT = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        className={useClassName(cl.ArticleListItem, {}, [className, cl[view]])}
        padding="24"
        border="partial"
        max
        data-testid="ArticleListItem"
        columnGap="8"
      >
        <HStack gap="8" maxWidth>
          {userInfo}
          <Text text={article.createdAt} />
        </HStack>

        <Text title={article.title} bold />
        <Text title={article.subtitle} size="s" />

        <AppImage
          fallback={<Skeleton width="100%" height={390} border="12px" />}
          errorFallback={<Skeleton width={'100%'} height={390} border="12px" />}
          src={article.img}
          alt={article.title}
          height={420}
          width={'100%'}
        />
        {textT?.paragraphs && (
          <Text
            className={cl.textBlock}
            text={textT.paragraphs.slice(0, 2).join(' ')}
          />
        )}
        <HStack maxWidth justify="between">
          <AppLink target={target} to={getRouteArticleDetails(article.id)}>
            <Button variant="outline">{t('Читать далее')}</Button>
          </AppLink>
          {views}
        </HStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={cl[view]}
    >
      <Card className={cl.card} border="partial" padding="0">
        <AppImage
          height={180}
          width={'100%'}
          fallback={<Skeleton width={'100%'} height={180} />}
          errorFallback={<Skeleton width={'100%'} height={180} />}
          alt={article.title}
          src={article.img}
        />
        <Card>
          <Text text={article.title} className={cl.title} />

          <div className={cl.textWrapper}>
            <HStack justify="between">
              <Text text={article.createdAt} />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </div>
        </Card>
      </Card>
    </AppLink>
  );
});
