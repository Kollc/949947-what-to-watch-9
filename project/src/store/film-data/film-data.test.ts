import { testPromoFilm } from '../../test-mock/films';
import { dataIsLoading, filmData, loadFavoriteList, loadFilms, loadPromoFilm } from './film-data';

describe('Reducer: filmData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        films: [],
        promoFilm: null,
        isDataLoadedFilms: false,
        favoriteList: [],
      });
  });

  it('Add promo film is success and loaded is true', () => {
    const state = {
      films: [],
      promoFilm: null,
      isDataLoadedFilms: false,
      favoriteList: [],
    };

    expect(filmData.reducer(state, loadPromoFilm(testPromoFilm))).toEqual({
      films: [],
      promoFilm: testPromoFilm,
      isDataLoadedFilms: true,
      favoriteList: [],
    });
  });

  it('Set data is loading', () => {
    const state = {
      films: [],
      promoFilm: null,
      isDataLoadedFilms: false,
      favoriteList: [],
    };

    expect(filmData.reducer(state, dataIsLoading())).toEqual({
      films: [],
      promoFilm: null,
      isDataLoadedFilms: false,
      favoriteList: [],
    });
  });

  it('Add films is success', () => {
    const state = {
      films: [],
      promoFilm: null,
      isDataLoadedFilms: false,
      favoriteList: [],
    };

    expect(filmData.reducer(state, loadFilms([testPromoFilm]))).toEqual({
      films: [testPromoFilm],
      promoFilm: null,
      isDataLoadedFilms: true,
      favoriteList: [],
    });
  });

  it('Add favorite list is success', () => {
    const state = {
      films: [],
      promoFilm: null,
      isDataLoadedFilms: false,
      favoriteList: [],
    };

    expect(filmData.reducer(state, loadFavoriteList([testPromoFilm]))).toEqual({
      films: [],
      promoFilm: null,
      isDataLoadedFilms: true,
      favoriteList: [testPromoFilm],
    });
  });
});
