import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilmById } from '../../services/api';
import { setError } from '../../store/film-process/film-process';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { ErrorType, FilmType } from '../../types';
import { getErrorMessage } from '../../utils/error';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import AddReviewBreadcrumbs from './add-review-breadcrumbs/add-review-breadcrumbs';
import AddReviewForm from './add-review-form/add-review-form';

function AddReviewPage(): JSX.Element  {
  const dispatch = useAppDispatch();
  const {id} = useParams<{id: string}>();
  const [film, setFilm] = useState<FilmType | null>(null);
  const [loading, setLoading]= useState(true);
  const requireAuthorization = useAppSelector(getAuthorizationStatus);
  const [errorFetch, setErrorFetch] = useState<ErrorType>(null);

  useEffect(() => {
    getFilmById(Number(id), setErrorFetch).then((data) => {
      setFilm(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if(errorFetch) {
      dispatch(setError(getErrorMessage(errorFetch)));
    }
  }, [errorFetch]);


  if(requireAuthorization !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.SignIn}/>;
  }

  if (loading || errorFetch  !== null) {
    return (
      <LoadingScreen/>
    );
  }

  if (film === null || film === undefined) {
    return <Navigate to="/404"/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header" data-testid='film-card-in-add-review'>
        <div className="film-card__bg">
          <img src={film.previewImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <AddReviewBreadcrumbs film={film}/>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review" data-testid='add-review-form-wrapper'>
        <AddReviewForm filmId={film.id}/>
      </div>

    </section>
  );
}

export default AddReviewPage;
