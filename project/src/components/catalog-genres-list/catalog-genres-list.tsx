import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { COUNT_FILM_LOADED } from '../../consts';

type CatalogGenresListProps = {
  allGenres: string[],
  setCountFilmShow: (value: number) => void,
  setGenre: (genre: string) => void,
  currentGenre: string,
}

function CatalogGenresList({allGenres, setCountFilmShow, setGenre, currentGenre}: CatalogGenresListProps): JSX.Element {
  const handleGenreClick = (evt: MouseEvent, genre: string) => {
    evt.preventDefault();
    setGenre(genre);
    setCountFilmShow(COUNT_FILM_LOADED);
  };

  return (
    <ul className="catalog__genres-list" data-testid='catalog__genres-list'>
      {allGenres.map((genre: string) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}>
          <Link to='' className="catalog__genres-link" data-testid='catalog__genres-link' onClick={(evt) => handleGenreClick(evt, genre)}>
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CatalogGenresList;
