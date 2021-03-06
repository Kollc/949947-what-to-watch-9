import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../../consts';
import { testFilms, testPromoFilm } from '../../../../test-mock/films';
import HistoryRouter from '../../../history-route/history-route';
import MovieReviewsTab from './movie-reviews-tab';

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

describe('MovieReviewsTab', () => {
  it('MovieReviewsTab redner is success', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MovieReviewsTab filmId={1}/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('film-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('review-wrapper')).toBeInTheDocument();
    });
  });
});
