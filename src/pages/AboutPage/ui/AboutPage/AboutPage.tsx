import { Page } from '@/widgets/Page';

import { JsonBlock } from '../JsonBlock/JsonBlock';

/**
 * Этот компонент включает блок с примером JSON-данных,предоставляемый компонентом `JsonBlock`.
 *
 * @returns {JSX.Element} Страница с блоком JSON-примеров.
 */

const AboutPage = () => {
  return (
    <Page data-testid="AboutPage">
      <JsonBlock />
    </Page>
  );
};

export default AboutPage;
