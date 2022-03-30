import MainPage from '../main-page/main-page';
import { Route, Routes} from 'react-router-dom';
import { AppRoute } from '../../consts';
import SignInPage from '../sign-in-page/sign-in.page';
import MyListPage from '../my-list-page/my-list-page';
import MoviePage from '../movie-page/movie-page';
import AddReviewPage from '../add-review/add-review';
import Player from '../player/player';
import NotFoundPage from '../not-found-page/not-found.page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browse-history';

function App(): JSX.Element {
  const {isDataLoaded} = useAppSelector((state) => state);
  const {films, promoFilm} = useAppSelector((state) => state);

  if (!isDataLoaded || promoFilm === null) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage films={films} promoFilm={promoFilm}/>}/>
        <Route path={AppRoute.SignIn} element={<SignInPage/>}/>
        <Route path={AppRoute.MyList} element={<PrivateRoute><MyListPage films={films}/></PrivateRoute>}/>
        <Route path={AppRoute.Film} element={<MoviePage films={films}/>}/>
        <Route path={AppRoute.AddReview} element={<AddReviewPage films={films}/>}/>
        <Route path={AppRoute.Player} element={<Player films={films}/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
