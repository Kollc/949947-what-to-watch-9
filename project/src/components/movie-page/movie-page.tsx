import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByIdAction, fetchSimilarFilmAction } from '../../store/actions/api-actions';
import Footer from '../footer/footer';
import Header from '../header/header';
import MoreLikeThis from '../more-like-this/more-like-this';
import MovieNavDesc from './movie-nav-desc/movie-nav-desc';

function MoviePage(): JSX.Element {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmByIdAction(Number(id)));
    dispatch(fetchSimilarFilmAction(Number(id)));
  }, [id]);

  const {currentOpenFilm, similarFilms} = useAppSelector((state) => state);

  if (currentOpenFilm === null) {
    return <Navigate to="/404"/>;
  }

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentOpenFilm.backgroundImage} alt={currentOpenFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentOpenFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentOpenFilm.genre}</span>
                <span className="film-card__year">{currentOpenFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${currentOpenFilm.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${currentOpenFilm.id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentOpenFilm.posterImage} alt={currentOpenFilm.name} width="218" height="327" />
            </div>
            <MovieNavDesc film={currentOpenFilm}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <MoreLikeThis films={similarFilms}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default MoviePage;
