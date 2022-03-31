import { dataIsLoading, loadCurrentFilm, loadSimilarFilms, resetUser, setUser } from './../actions/actions';
import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_FILTER_GENRE_VALUE } from '../../consts';
import { FilmType } from '../../types';
import { UserData } from '../../types/user';
import { loadFilms, loadPromoFilm, requireAuthorization, setError, setGenre } from '../actions/actions';

type initialStateTypes = {
  genre: string,
  films: FilmType[],
  promoFilm: FilmType | null,
  error: string,
  isDataLoaded: boolean,
  requireAuthorization: AuthorizationStatus,
  user: UserData | null,
  currentOpenFilm: FilmType | null,
  similarFilms: FilmType[],
}

const initialState: initialStateTypes = {
  genre: DEFAULT_FILTER_GENRE_VALUE,
  films: [],
  promoFilm: null,
  error: '',
  isDataLoaded: false,
  requireAuthorization: AuthorizationStatus.Unknown,
  user: null,
  currentOpenFilm: null,
  similarFilms: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.requireAuthorization = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(resetUser, (state) => {
      state.user = null;
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentOpenFilm = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(dataIsLoading, (state) => {
      state.isDataLoaded  = false;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    });
});

export {reducer};
