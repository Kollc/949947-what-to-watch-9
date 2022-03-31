import { FilmType } from '../../types';
import ListFilmsCard from '../list-films-card/list-films-card';

type MoreLikeThisProps = {
  films: FilmType[],
}

function MoreLikeThis({films}: MoreLikeThisProps): JSX.Element {
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <ListFilmsCard films={films}/>
    </section>
  );
}

export default MoreLikeThis;
