import {createSlice} from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../consts';
import {UserProcessType} from '../../types/state';

const initialState: UserProcessType = {
  requireAuthorization: AuthorizationStatus.Unknown,
  user: null,
  error: '',
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.requireAuthorization = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {setUser, requireAuthorization, resetUser, setUserError} = userProcess.actions;
