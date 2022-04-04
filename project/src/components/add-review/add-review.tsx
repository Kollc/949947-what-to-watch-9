import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getFilmById } from '../../services/api';
import { FilmType } from '../../types';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import AddReviewForm from './add-review-form/add-review-form';

function AddReviewPage(): JSX.Element  {
  const {id} = useParams<{id: string}>();
  const [film, setFilm] = useState<FilmType | null>(null);
  const [loading, setLoading]= useState(true);
  const {requireAuthorization} = useAppSelector((state) => state);

  useEffect(() => {
    getFilmById(Number(id)).then((data) => {
      setFilm(data);
      setLoading(false);
    });
  }, [id]);

  if(requireAuthorization !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.SignIn}/>;
  }

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  if (film === null) {
    return <Navigate to="/404"/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.previewImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm filmId={film.id}/>
      </div>

    </section>
  );
}

export default AddReviewPage;
