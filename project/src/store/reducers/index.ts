import { resetUser, setUser } from './../actions/actions';
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
}

const initialState: initialStateTypes = {
  genre: DEFAULT_FILTER_GENRE_VALUE,
  films: [],
  promoFilm: null,
  error: '',
  isDataLoaded: false,
  requireAuthorization: AuthorizationStatus.Unknown,
  user: null,
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
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    });
});

export {reducer};
