import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
  test('test render', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('test toggle', () => {
    renderWithTranslation(<Sidebar />);
    const sidebarElem = screen.getByTestId('sidebar');
    const toggleBtn = screen.getByTestId('sidebar-toggle');

    fireEvent.click(toggleBtn);
    expect(sidebarElem).toHaveClass('collapsed');
    fireEvent.click(toggleBtn);
    expect(sidebarElem).not.toHaveClass('collapsed');
  });
});
