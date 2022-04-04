import { AuthorizationStatus } from '../consts.js';
import {store} from '../store/store.js';
import { FilmType } from './film.js';
import { UserData } from './user.js';

export type UserProcessType = {
  requireAuthorization: AuthorizationStatus,
  user: UserData | null,
};

export type FilmProcessType = {
  error: string,
};

export type FilmDataType = {
  films: FilmType[],
  promoFilm: FilmType | null,
  isDataLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
