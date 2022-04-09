import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../consts';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    requireAuthorization: AuthorizationStatus.NoAuth,
    user: null,
  },
});

const storeAuth = mockStore({
  USER: {
    requireAuthorization: AuthorizationStatus.Auth,
    user: null,
  },
});

const history = createMemoryHistory();

const headerWithNoAuth = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Header />
    </HistoryRouter>
  </Provider>
);

const headerWithAuth = (
  <Provider store={storeAuth}>
    <HistoryRouter history={history}>
      <Header />
    </HistoryRouter>
  </Provider>
);

describe('Header', () => {
  it('Header should render is success when user no Auth', () => {
    render(headerWithNoAuth);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('Header should render is success when user Auth', () => {
    render(headerWithAuth);
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('Click sign-out to call dispatch', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(headerWithAuth);

    userEvent.click(screen.getByTestId('sign-out'));
    expect(dispatch).toBeCalled();
  });
});
