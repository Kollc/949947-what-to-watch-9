import { createReducer } from '@reduxjs/toolkit';
import { films } from '../../mocks/films';
import { setFilms, setGenre } from '../actions';

const DEFAULT_FILTER_GENRE_VALUE = 'All genres';

const initialState = {
  genre: DEFAULT_FILTER_GENRE_VALUE,
  films: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilms, (state) => {
      state.films = films;
    });
});

export {reducer};
