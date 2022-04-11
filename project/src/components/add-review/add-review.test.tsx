import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import { testFilms, testPromoFilm } from '../../test-mock/films';
import HistoryRouter from '../history-route/history-route';
import AddReviewPage from './add-review';

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

describe('AddReviewPage', () => {
  it('AddReviewPage redner is success', async () => {
    history.push('/films/1/review');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewPage/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('film-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('film-card-in-add-review')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('add-review-form-wrapper')).toBeInTheDocument();
    });
  });
});
