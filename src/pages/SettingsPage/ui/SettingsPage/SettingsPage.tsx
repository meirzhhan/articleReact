import { memo } from 'react';

import { Page } from '@/widgets/Page';
import { SettingsFeatures } from '@/features/settingsFeatures';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props;

  return (
    <Page className={className}>
      <SettingsFeatures />
    </Page>
  );
});

export default SettingsPage;
