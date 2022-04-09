import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { testPromoFilm } from '../../test-mock/films';
import HistoryRouter from '../history-route/history-route';
import CardItem from './card-item';

describe('CardItem', () => {
  const history = createMemoryHistory();

  const cardItem = (
    <HistoryRouter history={history}>
      <CardItem film={testPromoFilm}/>
    </HistoryRouter>);

  it('CardItem should render is succes', () => {
    render(cardItem);

    expect(screen.getByTestId('film-card')).toBeInTheDocument();
  });

  it('CardItem Link click is work success', () => {
    render(cardItem);

    const timeClear = jest.spyOn(window, 'clearTimeout');

    userEvent.click(screen.getByTestId('film-card-link'));

    expect(timeClear).toBeCalled();
  });
});
