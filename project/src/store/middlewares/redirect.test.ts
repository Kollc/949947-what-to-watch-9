import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {State} from '../../types/state';
import { AppRoute } from '../../consts';
import { redirectToRoute } from '../actions/actions';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browse-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Main));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Main),
    ]);
  });
});
