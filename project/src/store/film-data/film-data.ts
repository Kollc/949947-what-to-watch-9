import { FilmDataType } from './../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

const initialState: FilmDataType = {
  films: [],
  promoFilm: null,
  isDataLoadedFilms: false,
  favoriteList: [],
};

export const filmData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
      state.isDataLoadedFilms = true;
    },
    dataIsLoading: (state) => {
      state.isDataLoadedFilms  = false;
    },
    loadFilms: (state, action) => {
      state.films = action.payload;
      state.isDataLoadedFilms = true;
    },
    loadFavoriteList: (state, action) => {
      state.favoriteList = action.payload;
      state.isDataLoadedFilms = true;
    },
  },
});

export const {loadPromoFilm, dataIsLoading, loadFilms, loadFavoriteList} = filmData.actions;
