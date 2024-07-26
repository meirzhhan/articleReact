import { AppRoutes } from '@/shared/const/router';
import { Toolbar } from '@/widgets/Toolbar';
import { ReactElement } from 'react';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <Toolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <Toolbar />,
  };

  return toolbarByAppRoute[appRoute];
}
