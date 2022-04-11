import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthorizationStatus, FavoriteFetchType, HttpCode } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilmById } from '../../services/api';
import { addFavoriteAction } from '../../store/actions/api-actions';
import { getFavoriteList } from '../../store/film-data/selectors';
import { setError } from '../../store/film-process/film-process';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { ErrorType, FilmType } from '../../types';
import { checkFilmInFavoriteList } from '../../utils';
import { getErrorMessage, getErrorStatus } from '../../utils/error';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import MoreLikeThis from '../more-like-this/more-like-this';
import MovieNavDesc from './movie-nav-desc/movie-nav-desc';

function MoviePage(): JSX.Element {
  const navigate = useNavigate();
  const {id} = useParams();
  const [film, setFilm] = useState<FilmType | null>(null);
  const [loading, setLoading]= useState(true);
  const requireAuthorization = useAppSelector(getAuthorizationStatus);
  const favoriteList = useAppSelector(getFavoriteList);
  const [typeFavoriteAction, setTypeFavoriteAction] = useState<FavoriteFetchType>(FavoriteFetchType.Add);
  const dispatch = useAppDispatch();
  const [errorFetch, setErrorFetch] = useState<ErrorType>(null);
  const [errorStatus, setErrorStatus] = useState<number>(HttpCode.Ok);

  useEffect(() => {
    if(film) {
      if(checkFilmInFavoriteList(film, favoriteList)) {
        setTypeFavoriteAction(FavoriteFetchType.Remove);
      } else {
        setTypeFavoriteAction(FavoriteFetchType.Add);
      }
    }
  }, [favoriteList, film]);

  useEffect(() => {
    getFilmById(Number(id), setErrorFetch).then((data) => {
      setFilm(data);
      setLoading(false);
    });
  }, [id]);

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

  if (film === null || film === undefined) {
    return <Navigate to="/404"/>;
  }

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title" data-testid='film-name'>{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${film.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {AuthorizationStatus.Auth === requireAuthorization && (
                  <button className="btn btn--list film-card__button" type="button" onClick={() =>  dispatch(addFavoriteAction({filmId: film.id, type: typeFavoriteAction}))}>
                    {
                      typeFavoriteAction
                        ?
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg>
                        :
                        <svg viewBox="0 0 18 14" width="18" height="14">
                          <use xlinkHref="#in-list"></use>
                        </svg>
                    }
                    <span>My list</span>
                  </button>
                )}
                {
                  requireAuthorization === AuthorizationStatus.Auth  &&  <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327" />
            </div>
            <MovieNavDesc film={film}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <MoreLikeThis filmId={film.id}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default MoviePage;
