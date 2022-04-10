import { DEFAULT_FILTER_GENRE_VALUE, TypeRatingText, TypeRatingValue } from '../consts';
import { FilmType } from '../types';

const formatFilmRunTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

const getAllGenres = (films: FilmType[]) => ([...new Set([DEFAULT_FILTER_GENRE_VALUE, ...films.map((film) => film.genre)])].slice(0, 9));

const getFilmsByGenre = (films: FilmType[], genre: string) => {
  if(genre === DEFAULT_FILTER_GENRE_VALUE) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};

const getTextRatingDescription = (rating: number): TypeRatingText => {
  if(rating <= TypeRatingValue.Bad) {
    return TypeRatingText.Bad;
  } else if(rating > TypeRatingValue.Bad && rating <= TypeRatingValue.Normal) {
    return TypeRatingText.Normal;
  } else if(rating > TypeRatingValue.Normal && rating <= TypeRatingValue.Good) {
    return TypeRatingText.Good;
  } else if(rating > TypeRatingValue.Good && rating < TypeRatingValue.VeryGood) {
    return TypeRatingText.VeryGood;
  }

  return TypeRatingText.Awesome;
};

const getFromatedDate = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
};

const checkFilmInFavoriteList = (film: FilmType, favoritList: FilmType[]) => {
  const result = favoritList.filter((filmFromList) => filmFromList.id === film.id);

  if(result.length > 0) {
    return true;
  }

  return false;
};

export {
  formatFilmRunTime,
  getAllGenres,
  getFilmsByGenre,
  getTextRatingDescription,
  getFromatedDate,
  checkFilmInFavoriteList
};
