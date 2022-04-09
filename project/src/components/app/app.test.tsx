import {render, screen, waitFor} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { testFilms, testPromoFilm } from '../../test-mock/films';

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

const storeAuth = mockStore({
  USER: {
    requireAuthorization: AuthorizationStatus.Auth,
    user: null,
  },
  DATA: {
    films: [],
    promoFilm: testPromoFilm,
    isDataLoadedFilms: true,
    favoriteList: testFilms,
  },
  FILM: {
    error: '',
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

const fakeAppAuth = (
  <Provider store={storeAuth}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);
    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render "SignInPage" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
  });

  it('should render "MyListPage" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    render(fakeAppAuth);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByTestId('my-list')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Return to main page')).toBeInTheDocument();
  });

  it('should render "MoviePage" when user navigate to "/films/:id"', async () => {
    history.push('/films/1');

    render(fakeApp);
    expect(screen.getByTestId('film-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Play/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('film-name')).toBeInTheDocument();
    });
  });

  it('should render "AddReviewPage" when user navigate to "/films/:id/review"', async () => {
    history.push('/films/1/review');

    render(fakeAppAuth);

    expect(screen.getByTestId('film-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('add-review-form-wrapper')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('film-card-in-add-review')).toBeInTheDocument();
    });
  });

  it('should render "Player" when user navigate to "/player/:id"', async () => {
    history.push('/player/1');

    render(fakeApp);

    expect(screen.getByTestId('film-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('player')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('video')).toBeInTheDocument();
    });
  });
});
