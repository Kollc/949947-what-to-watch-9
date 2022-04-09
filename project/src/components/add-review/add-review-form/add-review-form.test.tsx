import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../consts';
import { testFilms, testPromoFilm } from '../../../test-mock/films';
import HistoryRouter from '../../history-route/history-route';
import AddReviewForm from './add-review-form';

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

describe('MainPage', () => {
  it('MainPage redner is success', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm filmId={1}/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('add-review__form')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
