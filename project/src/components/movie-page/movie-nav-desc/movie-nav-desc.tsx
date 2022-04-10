import {useState, MouseEvent} from 'react';
import { FilmType } from '../../../types';
import MovieDetailsTab from './movie-details-tab/movie-details-tab';
import MovieOverviewTab from './movie-overview-tab/movie-overview-tab';
import MovieReviewsTab from './movie-reviews-tab/movie-reviews-tab';

enum MoviePageTabLinks {
  overview = 'Overview',
  details = 'Details',
  reviews = 'Reviews',
}

type MovieNavDescProps = {
  film: FilmType
}

function MovieNavDesc({film}: MovieNavDescProps): JSX.Element {
  const [currentLink, setCurrentLink] = useState(MoviePageTabLinks.overview);

  const handleOverviewTabLinkClick = (evt: MouseEvent) => {
    evt.preventDefault();
    setCurrentLink(MoviePageTabLinks.overview);
  };

  const handleDetailsTabLinkClick = (evt: MouseEvent) => {
    evt.preventDefault();
    setCurrentLink(MoviePageTabLinks.details);
  };

  const handleReviewsTabLinkClick = (evt: MouseEvent) => {
    evt.preventDefault();
    setCurrentLink(MoviePageTabLinks.reviews);
  };

  const setClassActive = (link: MoviePageTabLinks) => {
    if(currentLink === link) {
      return 'film-nav__item--active';
    }

    return '';
  };

  return(
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${setClassActive(MoviePageTabLinks.overview)}`}>
            <a href="#" className="film-nav__link" onClick={handleOverviewTabLinkClick}>
              {MoviePageTabLinks.overview}
            </a>
          </li>
          <li className={`film-nav__item ${setClassActive(MoviePageTabLinks.details)}`}>
            <a href="#" className="film-nav__link" onClick={handleDetailsTabLinkClick}>
              {MoviePageTabLinks.details}
            </a>
          </li>
          <li className={`film-nav__item ${setClassActive(MoviePageTabLinks.reviews)}`}>
            <a href="#" className="film-nav__link" onClick={handleReviewsTabLinkClick}>
              {MoviePageTabLinks.reviews}
            </a>
          </li>
        </ul>
      </nav>
      {currentLink === MoviePageTabLinks.overview && <MovieOverviewTab film={film}/>}
      {currentLink === MoviePageTabLinks.details && <MovieDetailsTab film={film}/>}
      {currentLink === MoviePageTabLinks.reviews && <MovieReviewsTab filmId={film.id}/>}
    </div>
  );
}

export default MovieNavDesc;
