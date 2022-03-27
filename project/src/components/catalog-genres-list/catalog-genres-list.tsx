import { MouseEvent } from 'react';
import { COUNT_FILM_LOADED } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGenre } from '../../store/actions/actions';

type CatalogGenresListProps = {
  allGenre: string[],
  setCountFilmShow: (value: number) => void,
}

function CatalogGenresList({allGenre, setCountFilmShow}: CatalogGenresListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector((state) => state.genre);

  const clickToChangeGenreHandler = (evt: MouseEvent, genre: string) => {
    evt.preventDefault();
    dispatch(setGenre(genre));
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
