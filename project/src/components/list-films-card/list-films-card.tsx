import { useState } from 'react';
import { FilmType } from '../../types';
import CardItem from '../card-item/card-item';

type ListFilmsCardProps = {
  films: FilmType[],
}

function ListFilmsCard({films}: ListFilmsCardProps): JSX.Element {
  const [, setCurrentFilmId] = useState<number | null>(null);

  const cardMouseOverHandler = (filmId: number) => {
    setCurrentFilmId(filmId);
  };

  return(
    <div className="catalog__films-list">
      {films.map((film) => (<CardItem key={film.id} film={film} onMouseOver={() => cardMouseOverHandler(film.id)} />))}
    </div>
  );
}

export default ListFilmsCard;
