import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/actions/api-actions';
import Footer from '../footer/footer';
import Header from '../header/header';

function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLoginFormHandler = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(loginAction({email, password}));
  };

  return (
    <div className="user-page">
      <Header/>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitLoginFormHandler}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email" id="user-email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
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
