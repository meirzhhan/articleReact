import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import cl from './ArticleListItem.module.scss';
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const { t } = useTranslation('some');
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article.id}`);
  }, [article.id, navigate]);

  const types = <Text className={cl.types} text={article.type.join(', ')} />;
  const views = (
    <>
      <Text className={cl.views} text={String(article.views)} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock; // Return first Text block

    return (
      <div
        className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}
      >
        <Card className={cl.card}>
          <div className={cl.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={cl.username} text={article.user.username} />
            <Text className={cl.date} text={article.createdAt} />
          </div>

          <Text className={cl.title} title={article.title} />
          {types}
          <img className={cl.img} src={article.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent
              className={cl.textBlock}
              block={textBlock}
            />
          )}
          <div className={cl.footer}>
            <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE}>
              {t('Читать далее')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cl.ArticleListItem, {}, [className, cl[view]])}>
      <Card className={cl.card} onClick={onOpenArticle}>
        <div className={cl.imageWrapper}>
          <img className={cl.img} src={article.img} alt={article.title} />
          <Text className={cl.date} text={article.createdAt} />
        </div>

        <div className={cl.infoWrapper}>
          {types}
          {views}
        </div>

        <Text className={cl.title} text={article.title} />
      </Card>
    </div>
  );
});
