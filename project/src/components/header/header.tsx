import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/actions/api-actions';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import Logo from '../logo/logo';

type HeaderProps = {
  children?: JSX.Element | null;
  isUserPage?: boolean,
}

function Header({children, isUserPage = false}: HeaderProps): JSX.Element {
  const navigate = useNavigate();
  const requireAuthorization = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  return (
    <header className={`page-header ${isUserPage ? 'user-page__head' : 'film-card__head'}`}>
      <Logo/>
      {isUserPage && <h1 className="page-title user-page__title">My list</h1>}
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
              <a className="user-block__link" onClick={() => dispatch(logoutAction())} data-testid='sign-out'>Sign out</a>
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
