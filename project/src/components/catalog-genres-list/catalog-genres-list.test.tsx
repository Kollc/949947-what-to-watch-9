import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { genreList } from '../../test-mock/genre';
import HistoryRouter from '../history-route/history-route';
import CatalogGenresList from './catalog-genres-list';


describe('CatalogGenreList', () => {
  const catalogGenreListProps = {
    allGenres: genreList,
    setCountFilmShow: jest.fn(),
    setGenre: jest.fn(),
    currentGenre: 'Adventure',
  };

  const history = createMemoryHistory();

  const catalogGenresList = (
    <HistoryRouter history={history}>
      <CatalogGenresList {...catalogGenreListProps}/>
    </HistoryRouter>);


  it('CatalogGenreList should render success', () => {
    render(catalogGenresList);
    expect(screen.getByTestId('catalog__genres-list')).toBeInTheDocument();
  });

  it('CatalogGenreList Link click is working', () => {
    render(catalogGenresList);

    userEvent.click(screen.getAllByTestId('catalog__genres-link')[0]);

    expect(catalogGenreListProps.setCountFilmShow).toBeCalled();
    expect(catalogGenreListProps.setGenre).toBeCalled();
  });
});
