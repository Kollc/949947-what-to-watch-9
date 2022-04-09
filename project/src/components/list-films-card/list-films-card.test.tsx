import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import { testFilms } from '../../test-mock/films';
import HistoryRouter from '../history-route/history-route';
import ListFilmsCard from './list-films-card';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  USER: {
    requireAuthorization: AuthorizationStatus.NoAuth,
    user: null,
  },
});

const listFilmsCard = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ListFilmsCard films={testFilms} />
    </HistoryRouter>
  </Provider>
);

describe('ListFilmsCard', () => {
  it('ListFilmsCard should render is success', () => {
    render(listFilmsCard);
    expect(screen.getByTestId('catalog__films-list')).toBeInTheDocument();
  });
});
