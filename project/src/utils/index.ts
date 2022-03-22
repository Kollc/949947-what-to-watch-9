import { DEFAULT_GENRE_FILM } from '../consts';
import { FilmType } from '../types';

const getFilmById = (films: FilmType[], id: string | undefined): FilmType | undefined => films.find((film) => film.id === Number(id));

const formatFilmRunTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

const getAllGenres = (films: FilmType[]) => {
  const genres = Array<string>();
  genres.push(DEFAULT_GENRE_FILM);

  films.forEach((film) => {
    genres.push(film.genre);
  });

  return Array.from(new Set(genres));
};

export {
  getFilmById,
  formatFilmRunTime,
  getAllGenres
};
