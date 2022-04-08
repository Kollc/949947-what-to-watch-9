import { AuthorizationStatus } from '../../consts';
import { testUser } from '../../test-mock/user';
import { requireAuthorization, resetUser, setUser, userProcess } from './user-process';


describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        requireAuthorization: AuthorizationStatus.Unknown,
        user: null,
      });
  });

  it('Authorization is success', () => {
    const state = {
      requireAuthorization: AuthorizationStatus.Unknown,
      user: null,
    };

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        requireAuthorization: AuthorizationStatus.Auth,
        user: null,
      });
  });

  it('Set user is success', () => {
    const state = {
      requireAuthorization: AuthorizationStatus.Unknown,
      user: null,
    };

    expect(userProcess.reducer(state, setUser(testUser)))
      .toEqual({
        requireAuthorization: AuthorizationStatus.Unknown,
        user: testUser,
      });
  });

  it('Reset user is success', () => {
    const state = {
      requireAuthorization: AuthorizationStatus.Unknown,
      user: null,
    };

    expect(userProcess.reducer(state, resetUser()))
      .toEqual({
        requireAuthorization: AuthorizationStatus.Unknown,
        user: null,
      });
  });
});
