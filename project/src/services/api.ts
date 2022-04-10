import { ErrorType } from './../types/error';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { APIRoute } from '../consts';
import { getToken } from './token';

const BACKEND_URL = 'https://9.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};

export const getFilmById = async (filmId: number, setError: (error: ErrorType) => void) => {
  const api = createAPI();
  try {
    const {data} = await api.get(`${APIRoute.Films}/${filmId}`);
    return data;
  } catch (error) {
    setError(error);
  }
};

export const getSimilarFilms = async (filmId: number, setError: (error: ErrorType) => void) => {
  const api = createAPI();
  try {
    const {data} = await api.get(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  } catch (error) {
    setError(error);
  }
};

export const getFilmComments = async (filmId: number, setError: (error: ErrorType) => void) => {
  const api = createAPI();
  try {
    const {data} = await api.get(`${APIRoute.Comment}/${filmId}`);
    return data;
  } catch (error) {
    setError(error);
  }
};

export const addNewComment = async (comment: string,  rating: number, filmId: number, setError: (error: ErrorType) => void) => {
  const api = createAPI();
  try {
    const res = await api.post(`${APIRoute.Comment}/${filmId}`, {comment, rating});
    return res;
  } catch (error) {
    setError(error);
  }
};

