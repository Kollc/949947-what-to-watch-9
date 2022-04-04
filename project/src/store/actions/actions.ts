import {createAction} from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { FilmType } from '../../types';
import { UserData } from '../../types/user';

export const setGenre = createAction<string>('film/setGenre');
export const loadFilms = createAction<FilmType[]>('data/loadFilms');
export const loadPromoFilm = createAction<FilmType>('data/loadPromoFilm');
export const setError = createAction<string>('film/setError');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
export const setUser = createAction<UserData>('user/setUser');
export const resetUser = createAction('user/resetUser');
export const dataIsLoading = createAction('data/dataIsLoading');
