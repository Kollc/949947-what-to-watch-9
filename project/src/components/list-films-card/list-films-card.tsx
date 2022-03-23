import { FilmType } from '../../types';
import CardItem from '../card-item/card-item';

type ListFilmsCardProps = {
  films: FilmType[],
}

function ListFilmsCard({films}: ListFilmsCardProps): JSX.Element {

  return(
    <div className="catalog__films-list">
      {films.map((film) => (<CardItem key={film.id} film={film}/>))}
    </div>
  );
}

export default ListFilmsCard;
