import { COUNT_FILM_LOADED } from '../../consts';

type ShowMoreProps = {
  countFilmShow:number,
   setCountFilmShow: (value: number) => void,
}

function ShowMore({countFilmShow, setCountFilmShow}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more" data-testid='show-more-wrapper'>
      <button className="catalog__button" type="button" onClick={() => setCountFilmShow(countFilmShow + COUNT_FILM_LOADED)} data-testid='show-more-button'>Show more</button>
    </div>
  );
}

export default ShowMore;
