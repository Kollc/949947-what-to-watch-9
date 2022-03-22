import { createReducer } from '@reduxjs/toolkit';
import { films } from '../../mocks/films';
import { setFilms, setFilmsByGenre, setGenre } from '../actions';

const DEFAULT_FILTER_GENRE_VALUE = 'All genres';

const initialState = {
  genre: DEFAULT_FILTER_GENRE_VALUE,
  films: films,
  originalFilms: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilmsByGenre, (state) => {
      if(state.genre === DEFAULT_FILTER_GENRE_VALUE) {
        state.films = films;
      } else {
        state.films = films.filter((film) => film.genre === state.genre);
      }
    })
    .addCase(setFilms, (state) => {
      state.films = films;
    });
});

export {reducer};
