import { AuthorizationStatus } from '../../consts';
import { testUser } from '../../test-mock/user';
import { requireAuthorization, resetUser, setUser, setUserError, userProcess } from './user-process';


describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        requireAuthorization: AuthorizationStatus.Unknown,
        user: null,
        error: '',
      });
  });

  it('Authorization is success', () => {
    const state = {
      requireAuthorization: AuthorizationStatus.Unknown,
      user: null,
      error: '',
    };

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        requireAuthorization: AuthorizationStatus.Auth,
        user: null,
        error: '',
      });
  });

  it('Set user is success', () => {
    const state = {
      requireAuthorization: AuthorizationStatus.Unknown,
      user: null,
      error: '',
    };

    expect(userProcess.reducer(state, setUser(testUser)))
      .toEqual({
        requireAuthorization: AuthorizationStatus.Unknown,
        user: testUser,
        error: '',
      });
  });

  it('Reset user is success', () => {
    const state = {
      requireAuthorization: AuthorizationStatus.Unknown,
      user: null,
      error: '',
    };

    expect(userProcess.reducer(state, resetUser()))
      .toEqual({
        requireAuthorization: AuthorizationStatus.Unknown,
        user: null,
        error: '',
      });
  });

  it('SetUserError  is success', () => {
    const state = {
      requireAuthorization: AuthorizationStatus.NoAuth,
      user: null,
      error: '',
    };

    expect(userProcess.reducer(state, setUserError('Error!')))
      .toEqual({
        requireAuthorization: AuthorizationStatus.NoAuth,
        user: null,
        error: 'Error!',
      });
  });
});
