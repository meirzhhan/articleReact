import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

import { EditableProfile } from '@/features/editableProfile';

import { customCl } from '@/shared/lib/hooks/useClassName';
import { VStack } from '@/shared/ui/Stack';

interface ProfilePageProps {
  className?: string;
}

/**
 * Компонент страницы профиля пользователя.
 *
 * @returns {JSX.Element} - Разметка страницы профиля пользователя.
 * Использует `useParams` для получения параметра `id` из URL и передает его в компонент `EditableProfile`.
 */

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Page data-testid="ProfilePage" className={customCl('', {}, [className])}>
      <VStack maxWidth gap={'16'}>
        <EditableProfile id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
