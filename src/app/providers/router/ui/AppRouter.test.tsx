import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AppRouter from './AppRouter';
import {
  getRouteAbout,
  getRouteAdmin,
  getRouteProfile,
} from '@/shared/consts/router';
import { screen } from '@testing-library/react';
import { UserRole } from '@/entities/User';

describe('AppRouter', () => {
  test('The page should render', async () => {
    componentRender(<AppRouter />, { route: getRouteAbout() });
    const page = await screen.findByTestId('AboutPage');

    expect(page).toBeInTheDocument();
  });

  test('Should redirect to NotFoundPage if route does not exist', async () => {
    componentRender(<AppRouter />, { route: '/randomUrl' });
    const page = await screen.findByTestId('NotFoundPage');

    expect(page).toBeInTheDocument();
  });

  test('Should redirect an unauthorized user to MainPage', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('2'),
    });
    const page = await screen.findByTestId('MainPage');

    expect(page).toBeInTheDocument();
  });

  test('Should render a Page with a protected route', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('2'),
      initialState: {
        user: {
          _initiated: true,
          authData: {},
        },
      },
    });
    const page = await screen.findByTestId('ProfilePage');

    expect(page).toBeInTheDocument();
  });

  test("Shouldn't render if user doesn't have required role(s) (USER)", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          _initiated: true,
          authData: {
            roles: [UserRole.USER],
          },
        },
      },
    });
    const page = await screen.findByTestId('ForbiddenPage');

    expect(page).toBeInTheDocument();
  });

  test('Should render if user has required role(s) (ADMIN || MANAGER)', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          _initiated: true,
          authData: {
            roles: [UserRole.USER, UserRole.ADMIN, UserRole.MANAGER],
          },
        },
      },
    });
    const page = await screen.findByTestId('AdminPanelPage');

    expect(page).toBeInTheDocument();
  });
});
