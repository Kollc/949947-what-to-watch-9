import { useMemo, useState } from 'react';
import { COUNT_FILM_LOADED, DEFAULT_FILTER_GENRE_VALUE } from '../../consts';
import { FilmType } from '../../types';
import { getAllGenres, getFilmsByGenre } from '../../utils';
import CardItem from '../card-item/card-item';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import ShowMore from '../show-more/show-more';

type ListFilmsCardProps = {
  films: FilmType[],
}

function ListFilmsCard({films}: ListFilmsCardProps): JSX.Element {
  const allGenre = getAllGenres(films);
  const [genre, setGenre] = useState(DEFAULT_FILTER_GENRE_VALUE);
  const [countFilmShow, setCountFilmShow] = useState(COUNT_FILM_LOADED);
  const currentFilms = getFilmsByGenre(films, genre).slice(0, countFilmShow);

  return(
    <>
      <CatalogGenresList currentGenre={genre} setGenre={setGenre} allGenre={allGenre} setCountFilmShow={setCountFilmShow}/>
      <div className="catalog__films-list" data-testid='catalog__films-list'>
        {useMemo(() => currentFilms.map((film) => (<CardItem key={film.id} film={film}/>)), [currentFilms])}
      </div>
      {countFilmShow <= currentFilms.length ? <ShowMore countFilmShow={countFilmShow} setCountFilmShow={setCountFilmShow}/> : ''}
    </>
  );
}

export default ListFilmsCard;
