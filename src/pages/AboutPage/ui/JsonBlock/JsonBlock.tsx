import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactJsonPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai.js';

import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import ss from '/json-server/example.json';

/**
 * Компонент `JsonBlock` отображает пример данных в виде отформатированного JSON.
 * Этот компонент использует `react-json-pretty` для отображения JSON-данных в стилизованном виде.
 *
 * @returns {JSX.Element} Отображает компонент `JsonBlock`.
 */

export const JsonBlock = memo(() => {
  const { t } = useTranslation('about');

  return (
    <VStack gap="32" align="center">
      <Card maxWidth padding="24" border="partial">
        <Text title={t('Пример данных, которые обрабатываются')} />
      </Card>
      <Card maxWidth padding="24" border="partial">
        <ReactJsonPretty theme={JSONPrettyMon} data={ss} />
      </Card>
    </VStack>
  );
});
