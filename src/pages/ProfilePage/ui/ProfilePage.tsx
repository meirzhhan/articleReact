import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { useParams } from 'react-router-dom';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page data-testid="ProfilePage" className={classNames('', {}, [className])}>
      <VStack max gap={'16'}>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
