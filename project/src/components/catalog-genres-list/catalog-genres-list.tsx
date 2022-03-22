import { MouseEvent, useEffect, useState } from 'react';
import { DEFAULT_GENRE_FILM } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { setFilmsByGenre, setGenre } from '../../store/actions';

type CatalogGenresListProps = {
  allGenre: string[],
}

function CatalogGenresList({allGenre}: CatalogGenresListProps): JSX.Element {
  const [currentGenre, setCurrentGenre] = useState(DEFAULT_GENRE_FILM);
  const dispatch = useAppDispatch();

  const clickToChangeGenreHandler = (evt: MouseEvent, genre: string) => {
    evt.preventDefault();
    setCurrentGenre(genre);
  };

  useEffect(() => {
    dispatch(setGenre(currentGenre));
    dispatch(setFilmsByGenre());
  }, [currentGenre]);

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
