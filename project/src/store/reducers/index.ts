import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_FILTER_GENRE_VALUE } from '../../consts';
import { FilmType } from '../../types';
import { loadFilms, setError, setGenre } from '../actions/actions';

type initialStateTypes = {
  genre: string,
  films: FilmType[],
  error: string,
  isDataLoaded: boolean,
}

const initialState: initialStateTypes = {
  genre: DEFAULT_FILTER_GENRE_VALUE,
  films: [],
  error: '',
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    });
});

export {reducer};
