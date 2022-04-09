import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import { testFilms, testPromoFilm } from '../../test-mock/films';
import HistoryRouter from '../history-route/history-route';
import PromoFilm from './promo-film';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    requireAuthorization: AuthorizationStatus.Auth,
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

const history = createMemoryHistory();

describe('PromoFilm', () => {
  it('PromoFilm redner is success', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PromoFilm promoFilm={testPromoFilm}/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByTestId('promo-film')).toBeInTheDocument();
  });

  it('PromoFilm click play to navigate to page', () => {
    const dispatch = jest.fn();

    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PromoFilm promoFilm={testPromoFilm}/>
        </HistoryRouter>
      </Provider>);

    userEvent.click(screen.getByTestId('my-list'));
    expect(dispatch).toBeCalled();
  });
});
