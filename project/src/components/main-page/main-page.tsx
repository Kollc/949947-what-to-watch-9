import { useAppSelector } from '../../hooks';
import { FilmType } from '../../types';
import { getAllGenres } from '../../utils';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import ListFilmsCard from '../list-films-card/list-films-card';
import PromoFilm from '../promo-film/promo-film';

type MainPageProps = {
  promoFilm: FilmType,
}

function MainPage({promoFilm}: MainPageProps): JSX.Element {
  const {films, originalFilms} = useAppSelector((state) => state);
  const allGenre = getAllGenres(originalFilms);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        <PromoFilm promoFilm={promoFilm}/>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <CatalogGenresList allGenre={allGenre}/>

          <ListFilmsCard films={films}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
