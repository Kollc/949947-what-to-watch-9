import { FilmType } from '../../types';
import Footer from '../footer/footer';
import Header from '../header/header';
import ListFilmsCard from '../list-films-card/list-films-card';

type MyListPageProps = {
  films: FilmType[]
}

function MyListPage({films}: MyListPageProps): JSX.Element {
  return (
    <div className="user-page">
      <Header/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <ListFilmsCard films={films}/>
      </section>

      <Footer/>
    </div>
  );
}

export default MyListPage;
