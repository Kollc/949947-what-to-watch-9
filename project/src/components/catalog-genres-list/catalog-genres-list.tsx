import { MouseEvent } from 'react';
import { COUNT_FILM_LOADED } from '../../consts';

type CatalogGenresListProps = {
  allGenre: string[],
  setCountFilmShow: (value: number) => void,
  setGenre: (genre: string) => void,
  currentGenre: string,
}

function CatalogGenresList({allGenre, setCountFilmShow, setGenre, currentGenre}: CatalogGenresListProps): JSX.Element {
  const clickToChangeGenreHandler = (evt: MouseEvent, genre: string) => {
    evt.preventDefault();
    setGenre(genre);
    setCountFilmShow(COUNT_FILM_LOADED);
  };

  return (
    <ul className="catalog__genres-list">
      {allGenre.map((genre: string) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => clickToChangeGenreHandler(evt, genre)}>
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CatalogGenresList;
