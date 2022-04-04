import { DEFAULT_FILTER_GENRE_VALUE, TYPE_RATING_TEXT, TYPE_RATING_VALUE } from '../consts';
import { FilmType } from '../types';

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

const getTextRatingDescription = (rating: number): TYPE_RATING_TEXT => {
  if(rating < TYPE_RATING_VALUE.Bad) {
    return TYPE_RATING_TEXT.Bad;
  } else if(rating > TYPE_RATING_VALUE.Bad && rating < TYPE_RATING_VALUE.Normal) {
    return TYPE_RATING_TEXT.Normal;
  } else if(rating > TYPE_RATING_VALUE.Normal && rating < TYPE_RATING_VALUE.Good) {
    return TYPE_RATING_TEXT.Good;
  } else if(rating > TYPE_RATING_VALUE.Good && rating < TYPE_RATING_VALUE.VeryGood) {
    return TYPE_RATING_TEXT.VeryGood;
  }

  return TYPE_RATING_TEXT.Awesome;
};

const getFromatedDate = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
};

export {
  formatFilmRunTime,
  getAllGenres,
  getFilmsByGenre,
  getTextRatingDescription,
  getFromatedDate
};
