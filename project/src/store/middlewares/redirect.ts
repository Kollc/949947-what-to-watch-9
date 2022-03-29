import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browse-history';
import { reducer } from '../reducers';


type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === 'user/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
