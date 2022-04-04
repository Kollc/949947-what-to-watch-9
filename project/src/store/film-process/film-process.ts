import { FilmProcessType } from './../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

const initialState: FilmProcessType = {
  error: '',
};

export const filmProcess = createSlice({
  name: NameSpace.film,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {setError} = filmProcess.actions;
