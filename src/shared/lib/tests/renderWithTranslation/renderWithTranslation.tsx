import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18nForTests from '@/shared/config/i18n/i18nForTests';

/**
 * Рендерит компонент с поддержкой перевода (i18n) для тестирования.
 *
 * @param component - Компонент, который нужно отрендерить.
 * @returns Результат рендеринга компонента с провайдером i18n.
 */

export function renderWithTranslation(component: ReactNode) {
  return render(
    <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>,
  );
}
