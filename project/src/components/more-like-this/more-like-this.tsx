import { FilmType } from '../../types';
import ListFilmsCard from '../list-films-card/list-films-card';

type MoreLikeThisProps = {
  films: FilmType[],
  genre: string,
}

function MoreLikeThis({films, genre}: MoreLikeThisProps): JSX.Element {
  const likeFilms = films.filter((film) => film.genre === genre);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <ListFilmsCard films={likeFilms}/>
    </section>
  );
}

export default MoreLikeThis;
