import { memo } from 'react';

import { User } from '@/entities/User';

import { getRouteProfile } from '@/shared/consts/router';

import { HStack } from '../Stack';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  className?: string;
  user: User;
  imgSize: number;
  textSize?: 's' | 'm' | 'l';
}

/**
 * `UserCard` компонент отображает карточку пользователя с аватаром и именем.
 * Карточка представляет собой ссылку на профиль пользователя и содержит его аватар и имя.
 *
 * @param {User} props.user - Объект пользователя, для которого отображается карточка.
 * @returns {JSX.Element | null} Компонент карточки пользователя или `null`, если пользователь не указан.
 */

export const UserCard = memo((props: UserCardProps) => {
  const { className, imgSize, user, textSize = 'm' } = props;
  const navigate = useNavigate();

  if (!user) return null;

  return (
    // Пришлось использовать navigate, чтобы не было вложенности <a><a></a></a>.
    // в ArticleListItem есть карточка статьи и внутри её ссылка на профиль редактора
    <HStack
      className={className}
      gap="8"
      onClick={() => navigate(getRouteProfile(user.id))}
    >
      <Avatar size={imgSize} src={user.avatar} />

      <Text text={user.username} bold size={textSize} />
    </HStack>
  );
});
