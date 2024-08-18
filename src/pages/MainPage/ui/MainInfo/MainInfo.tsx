import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@/entities/User';

import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';

interface MainInfoProps {
  className?: string;
  authData: User | undefined;
}

/**
 * `MainInfo` компонент отображает информацию.
 * Если пользователь авторизован , компонент отображает приветственное сообщение.
 * Если пользователь не авторизован, отображается сообщение с инструкцией по входу в систему.
 *
 * @param {User | undefined} props.authData - Данные авторизации пользователя.
 * @returns {JSX.Element} Компонент, отображающий информацию в зависимости от авторизации пользователя.
 */

export const MainInfo = memo((props: MainInfoProps) => {
  const { className, authData } = props;
  const { t } = useTranslation('main');

  return (
    <Card
      className={className}
      flexColumn
      gap="16"
      maxWidth
      padding="24"
      border="partial"
    >
      {authData ? (
        <Text
          title={t('Добро пожаловать в zhan news')}
          text={t(
            'Читайте статьи, комментируйте, ставьте оценки и будьте в курсе последних новостей',
          )}
          bold
        />
      ) : (
        <HStack justify="between">
          <Text
            title={t('Войдите в систему чтобы получить больше информации')}
            bold
          />
          <Text text={t('Логин: user, Пароль: 123')} />
        </HStack>
      )}
    </Card>
  );
});
