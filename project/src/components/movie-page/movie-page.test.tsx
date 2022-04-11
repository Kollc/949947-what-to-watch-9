import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen, waitFor} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { testFilms, testPromoFilm } from '../../test-mock/films';
import HistoryRouter from '../history-route/history-route';
import MoviePage from './movie-page';

const history = createMemoryHistory();
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

describe('MoviePage', () => {
  it('MoviePage should render correctly', async () => {
    history.push('/films/1');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Film} element={<MoviePage/>}/>
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('film-loader')).toBeInTheDocument();


    await waitFor(() => {
      expect(screen.getByTestId('main-page-wrapper')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('film-name')).toBeInTheDocument();
    });
  });
});
