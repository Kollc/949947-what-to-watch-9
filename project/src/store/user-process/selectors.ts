import { AuthorizationStatus, NameSpace } from '../../consts';
import {State} from '../../types/state';
import { UserData } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].requireAuthorization;
export const getUser = (state: State): UserData | null => state[NameSpace.user].user;
export const getUserError = (state: State): string => state[NameSpace.user].error;
