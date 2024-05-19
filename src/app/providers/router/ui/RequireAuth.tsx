import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
  let isAuth = useSelector(getUserAuthData);
  let location = useLocation();

  if (!isAuth) {
    // redirect to main page if authOnly Page
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  return children;
}
