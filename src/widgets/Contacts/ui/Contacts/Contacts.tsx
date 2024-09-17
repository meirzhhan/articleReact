import { memo } from 'react';

import { Card } from '@/shared/ui/Card';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import GithubIcon from '@/shared/assets/icons/github.svg';
import TelegramIcon from '@/shared/assets/icons/telegram.svg';
import WhatsappIcon from '@/shared/assets/icons/whatsapp.svg';

/**
 * `Contacts` компонент отображает карточку с ссылками для обратной связи
 *
 * @returns {JSX.Element} Компонент, отображающий ссылки на социальные сети и мессенджеры.
 */

export const Contacts = memo(() => {
  return (
    <Card maxWidth flexRow padding="16" border="round">
      <HStack maxWidth gap="16" justify="center">
        <AppLink
          to={'https://github.com/meirzhhan'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon Svg={GithubIcon} hover />
        </AppLink>
        <AppLink
          to="https://t.me/beimishev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon Svg={TelegramIcon} hover />
        </AppLink>
        <AppLink
          to={'https://api.whatsapp.com/send?phone=77076002075'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon Svg={WhatsappIcon} hover />
        </AppLink>
      </HStack>
    </Card>
  );
});
