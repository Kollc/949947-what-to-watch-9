import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useAppDispatch } from '../../hooks';
// import { fetchFilmByIdAction, fetchSimilarFilmAction } from '../../store/actions/api-actions';
import { FilmType } from '../../types';
import PlayerPreview from '../player-preview/player-preview';

type CardITemProps = {
  film: FilmType,
}

function CardItem({film}: CardITemProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  // const dispatch = useAppDispatch();
  let activeTimer: NodeJS.Timeout;

  const clickLinkFilmHandler = () => {
    clearTimeout(activeTimer);
    // dispatch(fetchFilmByIdAction(film.id));
    // dispatch(fetchSimilarFilmAction(film.id));
  };

  const onMouseOverHanlder = () => {
    activeTimer = setTimeout(() => setIsActive(true), 1000);
  };

  const onMouseLeaveHanlder = () => {
    if(activeTimer) {
      clearTimeout(activeTimer);
    }

    setIsActive(false);
  };

  return (
    <article className='small-film-card catalog__films-card' onMouseEnter={onMouseOverHanlder} onMouseLeave={onMouseLeaveHanlder}>
      <div className='small-film-card__image'>
        <PlayerPreview src={film.videoLink} poster={film.posterImage} isActive={isActive} />
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`/films/${film.id}`} onClick={clickLinkFilmHandler}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default CardItem;
