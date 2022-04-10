import { useAppSelector } from '../../hooks';
import { getFavoriteList } from '../../store/film-data/selectors';
import Footer from '../footer/footer';
import Header from '../header/header';
import ListFilmsCard from '../list-films-card/list-films-card';


function MyListPage(): JSX.Element {
  const favoriteList = useAppSelector(getFavoriteList);

  return (
    <div className="user-page">
      <Header isUserPage/>
      <section className="catalog" data-testid="my-list">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <ListFilmsCard films={favoriteList} showGenreList={false}/>
      </section>
      <Footer/>
    </div>
  );
}

export default MyListPage;
