import { FormEvent, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/actions/api-actions';
import { addErrorMessage, checkValidatePassword } from '../../utils/validate';
import Footer from '../footer/footer';
import Header from '../header/header';

function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {requireAuthorization} = useAppSelector((state) => state.USER);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const submitLoginFormHandler = (evt: FormEvent) => {
    evt.preventDefault();

    if(emailInput.current !== null && passwordInput.current !== null) {
      dispatch(loginAction({
        email: emailInput.current.value,
        password: passwordInput.current.value,
      }));
    }
  };

  if(requireAuthorization === AuthorizationStatus.Auth) {
    return <Navigate to='/'/>;
  }

  return (
    <div className="user-page">
      <Header/>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitLoginFormHandler}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={emailInput}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email" id="user-email"
                required
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
                onChange={(evt) => addErrorMessage(evt.target, checkValidatePassword(evt.target.value))}
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
