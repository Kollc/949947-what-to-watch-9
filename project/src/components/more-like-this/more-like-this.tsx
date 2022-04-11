import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { getSimilarFilms } from '../../services/api';
import { ErrorType, FilmType } from '../../types';
import ListFilmsCard from '../list-films-card/list-films-card';
import LoadingScreen from '../loading-screen/loading-screen';
import {setError} from '../../store/film-process/film-process';
import { getErrorMessage, getErrorStatus } from '../../utils/error';
import { HttpCode } from '../../consts';

type MoreLikeThisProps = {
  filmId: number
};

function MoreLikeThis({filmId}: MoreLikeThisProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [similarFilms, setSimilarFilms] = useState<FilmType[]>([]);
  const [loading, setLoading]= useState(true);
  const [errorFetch, setErrorFetch] = useState<ErrorType>(null);
  const [errorStatus, setErrorStatus] = useState<number>(HttpCode.Ok);

  useEffect(() => {
    getSimilarFilms(filmId, setErrorFetch).then((data) => {
      setSimilarFilms(data);
      setLoading(false);
    });
  }, [filmId]);

  useEffect(() => {
    if(errorFetch) {
      dispatch(setError(getErrorMessage(errorFetch)));
      setErrorStatus(getErrorStatus(errorFetch));
    }
  }, [errorFetch]);

  if ((loading || errorFetch) && errorStatus !== HttpCode.NotFound) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <ListFilmsCard films={similarFilms} showGenreList={false} isSimilarList/>
    </section>
  );
}

export default MoreLikeThis;
