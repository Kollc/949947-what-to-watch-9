import { useAppSelector } from '../../hooks';
import { FilmType } from '../../types';
import { getFilmsByGenre } from '../../utils';
import CardItem from '../card-item/card-item';

type ListFilmsCardProps = {
  films: FilmType[],
}

function ListFilmsCard({films}: ListFilmsCardProps): JSX.Element {
  const genre = useAppSelector((state) => state.genre);
  const currentFilms = getFilmsByGenre(films, genre);

  return(
    <div className="catalog__films-list">
      {currentFilms.map((film) => (<CardItem key={film.id} film={film}/>))}
    </div>
  );
}

export default ListFilmsCard;
