import { rootReducer } from './../reducers/root-reducer';
import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browse-history';


type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === 'user/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
