import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import { testFilms, testPromoFilm } from '../../test-mock/films';
import HistoryRouter from '../history-route/history-route';
import MyListPage from './my-list-page';

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

describe('MyListPage', () => {
  it('MyListPage redner is success', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListPage/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByTestId('my-list')).toBeInTheDocument();
  });
});
