import { AuthorizationStatus } from '../consts.js';
import {store} from '../store/store.js';
import { FilmType } from './film.js';
import { UserData } from './user.js';

export type UserProcessType = {
  requireAuthorization: AuthorizationStatus,
  user: UserData | null,
  error: string,
};

export type FilmProcessType = {
  error: string,
};

export type FilmDataType = {
  films: FilmType[],
  promoFilm: FilmType | null,
  isDataLoadedFilms: boolean,
  favoriteList: FilmType[],
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
