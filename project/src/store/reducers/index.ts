import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_FILTER_GENRE_VALUE } from '../../consts';
import { FilmType } from '../../types';
import { loadFilms, loadPromoFilm, requireAuthorization, setError, setGenre } from '../actions/actions';

type initialStateTypes = {
  genre: string,
  films: FilmType[],
  promoFilm: FilmType | null,
  error: string,
  isDataLoaded: boolean,
  requireAuthorization: AuthorizationStatus,
}

const initialState: initialStateTypes = {
  genre: DEFAULT_FILTER_GENRE_VALUE,
  films: [],
  promoFilm: null,
  error: '',
  isDataLoaded: false,
  requireAuthorization: AuthorizationStatus.Unknown,
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
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    });
});

export {reducer};
