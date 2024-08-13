import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { UiDesignSwitcher } from '@/features/profileEditSwitch';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props;

  return (
    <Page className={className}>
      <UiDesignSwitcher />{' '}
    </Page>
  );
});

export default SettingsPage;
