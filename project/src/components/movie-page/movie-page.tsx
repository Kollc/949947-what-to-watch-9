import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FilmType } from '../../types';
import { getFilmById } from '../../utils';
import Footer from '../footer/footer';
import Header from '../header/header';
import MoreLikeThis from '../more-like-this/more-like-this';
import MovieNavDesc from './movie-nav-desc/movie-nav-desc';

type MoviePageProps = {
  films: FilmType[]
}

function MoviePage({films}: MoviePageProps): JSX.Element {
  const {id} = useParams<{id: string}>();
  const film: FilmType | undefined = getFilmById(films, id);
  const navigate = useNavigate();

  if (film === undefined) {
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
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${id}`)}>
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
                <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
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
        <MoreLikeThis films={films} genre={film.genre}/>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default MoviePage;
