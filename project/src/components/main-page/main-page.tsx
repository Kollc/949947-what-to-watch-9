import { useState } from 'react';
import { COUNT_FILM_LOADED } from '../../consts';
import { useAppSelector } from '../../hooks';
import { FilmType } from '../../types';
import { getAllGenres, getFilmsByGenre } from '../../utils';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import ListFilmsCard from '../list-films-card/list-films-card';
import PromoFilm from '../promo-film/promo-film';
import ShowMore from '../show-more/show-more';

type MainPageProps = {
  promoFilm: FilmType,
}

function MainPage({promoFilm}: MainPageProps): JSX.Element {
  const {films} = useAppSelector((state) => state);
  const {genre} = useAppSelector((state) => state);
  const [countFilmShow, setCountFilmShow] = useState(COUNT_FILM_LOADED);
  const allGenre = getAllGenres(films);
  const currentFilms = getFilmsByGenre(films, genre).slice(0, countFilmShow);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        <PromoFilm promoFilm={promoFilm}/>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <CatalogGenresList allGenre={allGenre} setCountFilmShow={setCountFilmShow}/>

          <ListFilmsCard films={currentFilms}/>

          {countFilmShow <= currentFilms.length ? <ShowMore countFilmShow={countFilmShow} setCountFilmShow={setCountFilmShow}/> : ''}
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
