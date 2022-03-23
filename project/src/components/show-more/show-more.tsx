import { COUNT_FILM_LOADED } from '../../consts';

type ShowMoreProps = {
  countFilmShow:number,
   setCountFilmShow: (value: number) => void,
}

function ShowMore({countFilmShow, setCountFilmShow}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => setCountFilmShow(countFilmShow + COUNT_FILM_LOADED)}>Show more</button>
    </div>
  );
}

export default ShowMore;
