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
}

export enum HTTP_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum TYPE_RATING_TEXT {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'VeryGood',
  Awesome = 'Awesome'
}

export enum TYPE_RATING_VALUE {
  Bad = 3,
  Normal = 5,
  Good = 8,
  VeryGood = 10
}

export const COUNT_FILM_LOADED = 8;
export const DEFAULT_FILTER_GENRE_VALUE = 'All genres';
export const TIMEOUT_SHOW_ERROR = 2000;
