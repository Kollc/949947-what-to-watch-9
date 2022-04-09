import { testFilms } from './../../test-mock/films';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { checkAuthAction, loginAction, fetchFilmsAction, logoutAction, fetchPromoFilmAction, fetchFavoriteListAction, addFavoriteAction } from './api-actions';
import { APIRoute, FavoriteFetchType } from '../../consts';
import { State } from '../../types/state';
import { createAPI } from '../../services/api';
import { requireAuthorization } from '../user-process/user-process';
import { AuthData } from '../../types/user';
import { loadFavoriteList, loadFilms, loadPromoFilm } from '../film-data/film-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {email: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'secret');
  });

  it('should dispatch Load films when GET /films', async () => {
    const mockFilm = testFilms;
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFilms.toString());
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

  it('should dispatch Load promo film when GET /PromoFilm', async () => {
    mockAPI
      .onGet(APIRoute.PromoFilm)
      .reply(204);

    const store = mockStore();
    await store.dispatch(fetchPromoFilmAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadPromoFilm.toString());
  });

  it('should dispatch Favorite films when GET /Favorite', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(204);

    const store = mockStore();
    await store.dispatch(fetchFavoriteListAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadFavoriteList.toString());
  });

  it('should add film to favorite when server return 200', async () => {
    const store = mockStore();

    mockAPI
      .onPost(APIRoute.Favorite)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(addFavoriteAction({filmId: 1, type: FavoriteFetchType.Add}));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain('data/addFavorite/pending');
  });
});
