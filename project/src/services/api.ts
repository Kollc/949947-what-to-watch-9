import { AppRoute } from './../consts';
import { FilmType } from './../types/film';
import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://9.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

export const getPromoFilm = async () => {
  const api = createAPI();
  const {data} = await api.get<FilmType>(AppRoute.PromoFilm);
  return data;
};
