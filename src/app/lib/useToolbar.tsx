import { ReactElement } from 'react';

import { Toolbar } from '@/widgets/Toolbar';

import { AppRoutes } from '@/shared/consts/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export function useToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <Toolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <Toolbar />,
    [AppRoutes.ABOUT]: <Toolbar />,
  };

  return toolbarByAppRoute[appRoute];
}
