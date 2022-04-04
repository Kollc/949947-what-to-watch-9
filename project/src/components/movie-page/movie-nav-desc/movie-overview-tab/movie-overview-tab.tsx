import { Fragment } from 'react';
import { FilmType } from '../../../../types';
import { getTextRatingDescription } from '../../../../utils';

type MovieOverviewTabProps = {
  film: FilmType
}

function MovieOverviewTab({film}: MovieOverviewTabProps): JSX.Element {
  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getTextRatingDescription(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')} and other</strong></p>
      </div>
    </Fragment>
  );
}

export default MovieOverviewTab;
