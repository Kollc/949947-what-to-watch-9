import {fireEvent, render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import SignInPage from './sign-in.page';
import { AuthorizationStatus } from '../../consts';
import { testFilms, testPromoFilm } from '../../test-mock/films';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    requireAuthorization: AuthorizationStatus.NoAuth,
    user: null,
  },
  DATA: {
    films: testFilms,
    promoFilm: testPromoFilm,
    isDataLoadedFilms: true,
    favoriteList: [],
  },
  FILM: {
    error: '',
  },
});

describe('SignInPage', () => {
  it('should render "SignInPage" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'keks');
    userEvent.type(screen.getByTestId('password'), '12345dasasdasdasd6');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/12345dasasdasdasd6/i)).toBeInTheDocument();
  });

  it('Submit SignInPage call dispatch', () => {
    const dispatch = jest.fn();

    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInPage />
        </HistoryRouter>
      </Provider>,
    );

    fireEvent.submit(screen.getByTestId('sign-in__form'));

    expect(dispatch).toBeCalled();
  });
});
