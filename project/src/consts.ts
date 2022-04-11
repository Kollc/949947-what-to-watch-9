export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film =  '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  PromoFilm = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comment = '/comments',
  Favorite = '/favorite',
}

export enum FavoriteFetchType {
  Add = 1,
  Remove = 0,
}


export enum HttpCode {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum TypeRatingText {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'VeryGood',
  Awesome = 'Awesome'
}

export enum TypeRatingValue {
  Bad = 3,
  Normal = 5,
  Good = 8,
  VeryGood = 10
}

export enum NameSpace {
  data = 'DATA',
  film = 'FILM',
  user = 'USER',
}

export const COUNT_FILM_LOADED = 8;
export const DEFAULT_FILTER_GENRE_VALUE = 'All genres';
export const TIMEOUT_SHOW_ERROR = 2000;
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 400;
export const MAX_COUNT_SHOW_GENGES = 9;
export const SECONDS_IN_MINUTE = 60;
export const MAX_VALUE_RATING = 10;
export const MIN_VALUE_RATING = 1;
export const COUNT_SHOW_SIMILAR_FILMS = 4;
export const TIMEOUT_SHOW_PREVIEW_VIDEO = 1000;
export const PERCENTAGES = 100;
