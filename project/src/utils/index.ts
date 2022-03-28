import { DEFAULT_FILTER_GENRE_VALUE } from '../consts';
import { FilmType } from '../types';

const getFilmById = (films: FilmType[], id: string | undefined): FilmType | undefined => films.find((film) => film.id === Number(id));

const formatFilmRunTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

const getAllGenres = (films: FilmType[]) => ([...new Set([DEFAULT_FILTER_GENRE_VALUE, ...films.map((film) => film.genre)])]);

const getFilmsByGenre = (films: FilmType[], genre: string) => {
  if(genre === DEFAULT_FILTER_GENRE_VALUE) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};

export {
  getFilmById,
  formatFilmRunTime,
  getAllGenres,
  getFilmsByGenre
};
