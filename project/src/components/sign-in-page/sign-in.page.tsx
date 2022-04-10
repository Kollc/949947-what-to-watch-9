import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/actions/api-actions';
import { getAuthorizationStatus, getUserError } from '../../store/user-process/selectors';
import { addErrorMessage, checkValidatePassword } from '../../utils/validate';
import Footer from '../footer/footer';
import Header from '../header/header';

function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const requireAuthorization = useAppSelector(getAuthorizationStatus);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const error = useAppSelector(getUserError);
  const [passwordError, setPasswordError] = useState('');

  const handleLoginFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if(emailInput.current !== null && passwordInput.current !== null) {
      dispatch(loginAction({
        email: emailInput.current.value,
        password: passwordInput.current.value,
      }));
    }
  };

  const handleInputPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const message = checkValidatePassword(evt.target.value);
    setPasswordError(message);
    addErrorMessage(evt.target, message);
  };

  if(requireAuthorization === AuthorizationStatus.Auth) {
    return <Navigate to='/'/>;
  }

  return (
    <div className="user-page">
      <Header/>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleLoginFormSubmit} data-testid='sign-in__form'>
          {error &&
          <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div>}
          {passwordError &&
          <div className="sign-in__message">
            <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
          </div>}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={emailInput}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email" id="user-email"
                required
                data-testid='email'
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordInput}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                required
                minLength={2}
                onChange={handleInputPasswordChange}
                data-testid='password'
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}

export default SignInPage;
