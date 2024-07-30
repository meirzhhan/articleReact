import { AppRoutes } from '@/shared/consts/router';
import { Toolbar } from '@/widgets/Toolbar';
import { ReactElement } from 'react';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export function useToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <Toolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <Toolbar />,
  };

  return toolbarByAppRoute[appRoute];
}
