import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ErrorMessage from './error-message';

const mockStore = configureMockStore();

const store = mockStore({
  FILM: {
    error: 'Error!',
  },
});

const history = createMemoryHistory();

const errorMessage = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ErrorMessage />
    </HistoryRouter>
  </Provider>
);

describe('ErrorMessage', () => {
  it('ErrorMessage should render is success', () => {
    render(errorMessage);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
