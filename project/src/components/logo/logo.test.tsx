import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Logo from './logo';

const history = createMemoryHistory();

describe('Logo', () => {
  it('Logo should render is success', () => {
    render(
      <HistoryRouter history={history}>
        <Logo/>
      </HistoryRouter>);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
