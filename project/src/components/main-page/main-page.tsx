import { FilmType } from '../../types';
import CardItem from '../card-item/card-item';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import Footer from '../footer/footer';
import Header from '../header/header';
import PromoFilm from '../promo-film/promo-film';

type MainPageProps = {
  countCards: number,
  promoFilm: FilmType,
}

function MainPage({countCards, promoFilm}: MainPageProps): JSX.Element {

  const getCardsList = (): number[] => {
    const list = [];

    for(let i = 0; i < countCards; i++) {
      list.push(i);
    }

    return list;
  };

  const cardsList = getCardsList();

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
          <CatalogGenresList/>

          <div className="catalog__films-list">
            {cardsList.map((card) => (<CardItem key={card}/>))}
          </div>

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
