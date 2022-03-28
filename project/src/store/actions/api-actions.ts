import { AppRoute, TIMEOUT_SHOW_ERROR } from './../../consts';
import { store, api } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmType } from '../../types';
import { loadFilms, loadPromoFilm, setError } from './actions';
import { errorHandle } from '../../services/error-handler';

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const {data} = await api.get<FilmType[]>(AppRoute.Films);
      store.dispatch(loadFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      const {data} = await api.get<FilmType>(AppRoute.PromoFilm);
      store.dispatch(loadPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
