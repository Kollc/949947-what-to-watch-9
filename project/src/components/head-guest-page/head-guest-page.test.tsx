import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import HistoryRouter from '../history-route/history-route';
import HeadGuestPage from './head-guest-page';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    requireAuthorization: AuthorizationStatus.Unknown,
    user: null,
  },
});

describe('HeadGuestPage', () => {
  it('HeadGuestPage should render is success', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeadGuestPage/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getAllByRole('img')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('img')[1]).toBeInTheDocument();
  });
});
