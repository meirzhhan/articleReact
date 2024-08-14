import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData, User } from '@/entities/User';

import { Avatar } from '@/shared/ui/Avatar';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteProfile } from '@/shared/consts/router';
import EyeIcon from '@/shared/assets/icons/eye.svg';

interface ArticleAsideProps {
  className?: string;
  author: User;
  views: number;
  onEdit: () => void;
}

/**
 * Компонент ArticleAside отображает дополнительную информацию о статье,
 * такую как автор, дата создания и количество просмотров.
 *
 * @param {ArticleAsideProps} props - Свойства для компонента.
 * @returns {JSX.Element} Отрендеренный компонент.
 */

export const ArticleAside = memo((props: ArticleAsideProps) => {
  const { className, author, views, onEdit } = props;
  const { t } = useTranslation('article-info');

  const authData = useSelector(getUserAuthData);

  return (
    <VStack className={className} gap="32" align="center">
      <AppLink to={getRouteProfile(author.id)}>
        <HStack gap="8">
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Icon Svg={EyeIcon} />
          <Text text={String(views)} />
        </HStack>
      </AppLink>

      {authData?.id === author.id && (
        <Button onClick={onEdit}>{t('Редактировать')}</Button>
      )}
    </VStack>
  );
});
