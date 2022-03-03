import { FilmType } from '../../types';
import MainPage from '../main-page/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import SignInPage from '../sign-in-page/sign-in.page';
import MyListPage from '../my-list-page/my-list-page';
import MoviePage from '../movie-page/movie-page';
import AddReviewPage from '../add-review-page/add-review-page';
import Player from '../player/player';
import NotFoundPage from '../not-found-page/not-found.page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  countCards: number,
  promoFilm: FilmType,
}

function App({countCards, promoFilm}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage countCards={countCards} promoFilm={promoFilm}/>}/>
        <Route path={AppRoute.SignIn} element={<SignInPage/>}/>
        <Route path={AppRoute.MyList} element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><MyListPage/></PrivateRoute>}/>
        <Route path={AppRoute.Film} element={<MoviePage/>}/>
        <Route path={AppRoute.AddReview} element={<AddReviewPage/>}/>
        <Route path={AppRoute.Player} element={<Player/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
