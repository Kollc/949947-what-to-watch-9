import { APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from './../../consts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmType } from '../../types';
import { redirectToRoute } from './actions';
import { errorHandle } from '../../services/error-handler';
import { AuthData, UserData } from '../../types/user';
import { dropToken, saveToken } from '../../services/token';
import { dataIsLoading, loadFavoriteList, loadFilms, loadPromoFilm } from '../film-data/film-data';
import { requireAuthorization, resetUser, setUser } from '../user-process/user-process';
import { setError } from '../film-process/film-process';
import { FavoriteFetch } from '../../types/favorite';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/clearError',
  (_arg, {dispatch}) => {
    setTimeout(
      () => dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(dataIsLoading());
      const {data} = await api.get<FilmType[]>(APIRoute.Films);
      dispatch(loadFilms(data));
    } catch (error) {
      errorHandle(error, dispatch);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(dataIsLoading());
      const {data} = await api.get<FilmType>(APIRoute.PromoFilm);
      dispatch(loadPromoFilm(data));
    } catch (error) {
      errorHandle(error, dispatch);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}: AuthData, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(setUser(data));
    } catch (error) {
      errorHandle(error, dispatch);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(resetUser());
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error, dispatch);
    }
  },
);

export const addFavoriteAction = createAsyncThunk<void, FavoriteFetch, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addFavorite',
  async ({filmId, type}: FavoriteFetch, {dispatch, extra: api}) => {
    try {
      await api.post<FilmType>(`${APIRoute.Favorite}/${filmId}/${type}`);
      dispatch(fetchFavoriteListAction());
    } catch (error) {
      errorHandle(error, dispatch);
    }
  },
);

export const fetchFavoriteListAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteList',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmType>(`${APIRoute.Favorite}`);
    dispatch(loadFavoriteList(data));
  },
);
