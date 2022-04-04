import { useEffect, useState } from 'react';
import { getSimilarFilms } from '../../services/api';
import { FilmType } from '../../types';
import ListFilmsCard from '../list-films-card/list-films-card';
import LoadingScreen from '../loading-screen/loading-screen';

type MoreLikeThisProps = {
  filmId: number
};

function MoreLikeThis({filmId}: MoreLikeThisProps): JSX.Element {
  const [similarFilms, setSimilarFilms] = useState<FilmType[]>([]);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    getSimilarFilms(filmId).then((data) => {
      setSimilarFilms(data);
      setLoading(false);
    });
  }, [filmId]);

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <ListFilmsCard films={similarFilms}/>
    </section>
  );
}

export default MoreLikeThis;
