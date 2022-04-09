import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import { testFilms, testPromoFilm } from '../../test-mock/films';
import HistoryRouter from '../history-route/history-route';
import MoreLikeThis from './more-like-this';

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

const history = createMemoryHistory();

describe('MoreLikeThis', () => {
  it('MoreLikeThis redner is success', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MoreLikeThis filmId={1}/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });
});
