import { FilmType } from '../types';

const getFilmById = (films: FilmType[], id: string | undefined): FilmType | undefined => films.find((film) => film.id === Number(id));

const formatFilmRunTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

export {
  getFilmById,
  formatFilmRunTime
};
