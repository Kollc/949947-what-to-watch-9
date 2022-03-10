import { FilmType } from '../types';

const getFilmById = (films: FilmType[], id: string | undefined): FilmType | undefined => films.find((film) => film.id === Number(id));

export {
  getFilmById
};
