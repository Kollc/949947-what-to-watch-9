import { NameSpace } from '../../consts';
import { FilmType } from '../../types';
import {State} from '../../types/state';

export const getFilms = (state: State): FilmType[] => state[NameSpace.data].films;
export const getPromoFilm = (state: State): FilmType | null => state[NameSpace.data].promoFilm;
export const getIsLoadedFilms = (state: State): boolean => state[NameSpace.data].isDataLoadedFilms;
export const getFavoriteList = (state: State): FilmType[] => state[NameSpace.data].favoriteList;
