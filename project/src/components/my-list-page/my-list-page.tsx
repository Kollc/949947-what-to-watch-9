import { useAppSelector } from '../../hooks';
import Footer from '../footer/footer';
import Header from '../header/header';
import ListFilmsCard from '../list-films-card/list-films-card';


function MyListPage(): JSX.Element {
  const {favoriteList} = useAppSelector((state) => state.DATA);

  return (
    <div className="user-page">
      <Header/>
      <section className="catalog" data-testid="my-list">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <ListFilmsCard films={favoriteList}/>
      </section>
      <Footer/>
    </div>
  );
}

export default MyListPage;
