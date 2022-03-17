import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [currentTab, setCurrentTab] = useState(<MovieOverviewTab film={film}/>);
  const [currentLink, setCurrentLink] = useState(MoviePageTabLinks.overview);

  const clickTabLinkHandler = (component: JSX.Element, link: MoviePageTabLinks) => {
    setCurrentTab(component);
    setCurrentLink(link);
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
            <Link to="" className="film-nav__link" onClick={() => clickTabLinkHandler(<MovieOverviewTab film={film}/>, MoviePageTabLinks.overview)}>
              {MoviePageTabLinks.overview}
            </Link>
          </li>
          <li className={`film-nav__item ${setClassActive(MoviePageTabLinks.details)}`}>
            <Link to="" className="film-nav__link" onClick={() => clickTabLinkHandler(<MovieDetailsTab film={film}/>, MoviePageTabLinks.details)}>
              {MoviePageTabLinks.details}
            </Link>
          </li>
          <li className={`film-nav__item ${setClassActive(MoviePageTabLinks.reviews)}`}>
            <Link to="" className="film-nav__link" onClick={() => clickTabLinkHandler(<MovieReviewsTab/>, MoviePageTabLinks.reviews)}>
              {MoviePageTabLinks.reviews}
            </Link>
          </li>
        </ul>
      </nav>
      {currentTab}
    </div>
  );
}

export default MovieNavDesc;
