import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import { testFilms, testPromoFilm } from '../../test-mock/films';
import HistoryRouter from '../history-route/history-route';
import Player from './player';

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

describe('Player', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('Player should render correctly', async () => {
    history.push('/player/1');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('film-loader')).toBeInTheDocument();


    await waitFor(() => {
      expect(screen.getByTestId('video')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveClass('player__play');
    });
  });

  it('Click to play work is correctly', async () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Player/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('film-loader')).toBeInTheDocument();

    const playButton = await waitFor(() => (screen.findByTestId('play')));
    userEvent.click(playButton);

    await waitFor(() => {
      expect(window.HTMLVideoElement.prototype.play).toBeCalled();
    });
  });
});
