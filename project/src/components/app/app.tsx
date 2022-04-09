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

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage/>}/>
      <Route path={AppRoute.SignIn} element={<SignInPage/>}/>
      <Route path={AppRoute.MyList} element={<PrivateRoute><MyListPage/></PrivateRoute>}/>
      <Route path={AppRoute.Film} element={<MoviePage/>}/>
      <Route path={AppRoute.AddReview} element={<PrivateRoute><AddReviewPage/></PrivateRoute>}/>
      <Route path={AppRoute.Player} element={<Player/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
