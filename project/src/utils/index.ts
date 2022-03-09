import { FilmType } from '../types';

const getFilmOnId = (films: FilmType[], id: string | undefined): FilmType => {
  const filmsList = new Map();

  films.forEach((filmItem) => {
    filmsList.set(String(filmItem.id), filmItem);
  });

  return filmsList.get(id);
};

export {
  getFilmOnId
};
