import { FilmType } from '../../types';
import MainPage from '../main-page/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import SignInPage from '../sign-in-page/sign-in.page';
import MyListPage from '../my-list-page/my-list-page';
import MoviePage from '../movie-page/movie-page';
import AddReviewPage from '../add-review/add-review';
import Player from '../player/player';
import NotFoundPage from '../not-found-page/not-found.page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect, useState } from 'react';
import { getPromoFilm } from '../../services/api';
import { errorHandle } from '../../services/error-handler';


function App(): JSX.Element {
  const {isDataLoaded} = useAppSelector((state) => state);
  const [promoFilm,  setPromoFilm] = useState<FilmType | null>(null);
  const {films} = useAppSelector((state) => state);

  useEffect(() => {
    getPromoFilm().then((data) => {
      setPromoFilm(data);
    }).catch((error) => {
      errorHandle(error);
    });
  }, []);

  if (!isDataLoaded || promoFilm === null) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage promoFilm={promoFilm}/>}/>
        <Route path={AppRoute.SignIn} element={<SignInPage/>}/>
        <Route path={AppRoute.MyList} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><MyListPage films={films}/></PrivateRoute>}/>
        <Route path={AppRoute.Film} element={<MoviePage films={films}/>}/>
        <Route path={AppRoute.AddReview} element={<AddReviewPage films={films}/>}/>
        <Route path={AppRoute.Player} element={<Player films={films}/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
