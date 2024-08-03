import { useClassName } from '@/shared/lib/hooks/useClassName';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { EditableProfile } from '@/features/editableProfile';
import { useParams } from 'react-router-dom';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page
      data-testid="ProfilePage"
      className={useClassName('', {}, [className])}
    >
      <VStack maxWidth gap={'16'}>
        <EditableProfile id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
