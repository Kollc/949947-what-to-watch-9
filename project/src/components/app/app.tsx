import { FilmType } from '../../types';
import MainPage from '../main-page/main-page';

type AppProps = {
  countCards: number,
  promoFilm: FilmType,
}

function App({countCards, promoFilm}: AppProps): JSX.Element {
  return (
    <MainPage countCards={countCards} promoFilm={promoFilm}/>
  );
}

export default App;
