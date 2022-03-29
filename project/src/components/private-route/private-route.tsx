import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const {requireAuthorization} = useAppSelector((state) => state);

  return (
    requireAuthorization === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
