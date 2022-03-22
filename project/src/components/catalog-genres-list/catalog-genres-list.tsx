import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGenre } from '../../store/actions';

type CatalogGenresListProps = {
  allGenre: string[],
}

function CatalogGenresList({allGenre}: CatalogGenresListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector((state) => state.genre);

  const clickToChangeGenreHandler = (evt: MouseEvent, genre: string) => {
    evt.preventDefault();
    dispatch(setGenre(genre));
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
