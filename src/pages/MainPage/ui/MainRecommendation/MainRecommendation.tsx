import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { getUserDataByIdQuery } from '@/entities/User/';

import { ArticleRecommendation } from '@/features/articleRecommendation';

import { userWhoRecommendedId } from '@/entities/User/model/consts/userConsts';

import { Card } from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { UserCard } from '@/shared/ui/UserCard';
import { Skeleton } from '@/shared/ui/Skeleton';
import { getRouteArticles } from '@/shared/consts/router';

interface MainRecommendationProps {
  className?: string;
}

/**
 * `MainRecommendation` компонент отображает информацию о пользователе, который рекомендует статьи,
 * и предоставляет ссылку на список всех статей, а также блок с рекомендованными статьями.
 *
 * Если данные загружаются, отображается скелетон-заполнитель.
 * @returns {JSX.Element} Компонент, отображающий информацию о рекомендателе и блок с рекомендованными статьями.
 */

export const MainRecommendation = memo((props: MainRecommendationProps) => {
  const { className } = props;
  const { t } = useTranslation('main');

  const { data, isLoading } = getUserDataByIdQuery(userWhoRecommendedId);

  if (isLoading)
    return (
      <>
        <Skeleton border="20px" height={72} />
        <Skeleton border="20px" height={355} width="87%" />
      </>
    );

  if (!data) return null;

  return (
    <>
      <Card
        className={className}
        padding="16"
        border="partial"
        maxWidth
        flexRow
      >
        <HStack justify="between" maxWidth>
          <HStack gap="16">
            <UserCard imgSize={40} user={data} textSize="l" />
            <Text text={t('рекомендует')} size="l" />
          </HStack>

          <AppLink to={getRouteArticles()}>
            <Button variant="filled">{t('К списку всех статьей')}</Button>
          </AppLink>
        </HStack>
      </Card>

      <ArticleRecommendation align="center" count={4} />
    </>
  );
});
