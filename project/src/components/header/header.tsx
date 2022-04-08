import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/actions/api-actions';
import Logo from '../logo/logo';

type HeaderProps = {
  children?: JSX.Element | null;
}

function Header({children}: HeaderProps): JSX.Element {
  const navigate = useNavigate();
  const { requireAuthorization, user } = useAppSelector((state) => state.USER);
  const dispatch = useAppDispatch();

  return (
    <header className="page-header film-card__head">
      <Logo/>
      {children}
      {
        requireAuthorization === AuthorizationStatus.Auth
          ?
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar" onClick={() => navigate('/mylist')}>
                <img src={user?.avatarUrl} alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" onClick={() => dispatch(logoutAction())}>Sign out</a>
            </li>
          </ul>
          :
          <div className="user-block">
            <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
          </div>
      }

    </header>
  );
}

export default Header;
