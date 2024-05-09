import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
  test('test render', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('test toggle', () => {
    componentRender(<Sidebar />);
    const sidebarElem = screen.getByTestId('sidebar');
    const toggleBtn = screen.getByTestId('sidebar-toggle');

    fireEvent.click(toggleBtn);
    expect(sidebarElem).toHaveClass('collapsed');
    fireEvent.click(toggleBtn);
    expect(sidebarElem).not.toHaveClass('collapsed');
  });
});
