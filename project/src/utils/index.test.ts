import { testFilms, testFilmsDifferentGenre, testPromoFilm } from './../test-mock/films';
import { checkFilmInFavoriteList, formatFilmRunTime, getAllGenres, getFilmsByGenre, getFromatedDate, getTextRatingDescription } from '.';
import { TYPE_RATING_TEXT } from '../consts';

describe('Utils functions', () => {
  it('formatFilmRunTime should return is correct value', () => {
    expect(formatFilmRunTime(156)).toBe('2h 36m');
  });

  it('getAllGenres should return is correct value', () => {
    expect(getAllGenres(testFilms)).toStrictEqual(['All genres', 'Adventure']);
  });

  it('getFilmsByGenre should return is correct value', () => {
    expect(getFilmsByGenre(testFilmsDifferentGenre, 'Adventure')).toStrictEqual(testFilms);
  });

  it('getTextRatingDescription should return is correct value', () => {
    expect(getTextRatingDescription(5)).toBe(TYPE_RATING_TEXT.Normal);
    expect(getTextRatingDescription(10)).toBe(TYPE_RATING_TEXT.Awesome);
    expect(getTextRatingDescription(7)).toBe(TYPE_RATING_TEXT.Good);
    expect(getTextRatingDescription(9)).toBe(TYPE_RATING_TEXT.VeryGood);
    expect(getTextRatingDescription(3)).toBe(TYPE_RATING_TEXT.Bad);
  });

  it('getFromatedDate should return is correct value', () => {
    expect(getFromatedDate('2022-02-02T21:48:13.678Z')).toStrictEqual('February 3, 2022');
  });

  it('checkFilmInFavoriteList should return is correct value', () => {
    expect(checkFilmInFavoriteList(testPromoFilm, testFilms)).toStrictEqual(true);
  });
});
