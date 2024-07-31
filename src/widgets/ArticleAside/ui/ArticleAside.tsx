import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@/entities/User';

import { Avatar } from '@/shared/ui/Avatar';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

interface ArticleAsideProps {
  className?: string;
  author: User;
  createdAt: string;
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
  const { className, author, createdAt, views, onEdit } = props;
  const { t } = useTranslation();

  return (
    <VStack className={className} gap="32">
      <HStack gap="8">
        <Avatar src={author.avatar} size={32} />
        <Text text={author.username} bold />
        <Text text={createdAt} />
      </HStack>

      <Button onClick={onEdit}>{t('Редактировать')}</Button>
      <Text text={t('{{count}} просмотров', { count: views })} />
    </VStack>
  );
});
