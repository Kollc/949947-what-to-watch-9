import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TIMEOUT_SHOW_PREVIEW_VIDEO } from '../../consts';
import { FilmType } from '../../types';
import PlayerPreview from '../player-preview/player-preview';

type CardITemProps = {
  film: FilmType,
}

function CardItem({film}: CardITemProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  let activeTimer: NodeJS.Timeout;

  const onMouseOverHanlder = () => {
    activeTimer = setTimeout(() => setIsActive(true), TIMEOUT_SHOW_PREVIEW_VIDEO);
  };

  const onMouseLeaveHanlder = () => {
    if(activeTimer) {
      clearTimeout(activeTimer);
    }

    setIsActive(false);
  };

  return (
    <article className='small-film-card catalog__films-card' onMouseEnter={onMouseOverHanlder} onMouseLeave={onMouseLeaveHanlder} data-testid='film-card'>
      <div className='small-film-card__image' onClick={() => navigate(`/films/${film.id}`)}>
        <PlayerPreview src={film.videoLink} poster={film.posterImage} isActive={isActive} />
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`/films/${film.id}`} onClick={() => clearTimeout(activeTimer)} data-testid='film-card-link'>{film.name}</Link>
      </h3>
    </article>
  );
}

export default CardItem;
