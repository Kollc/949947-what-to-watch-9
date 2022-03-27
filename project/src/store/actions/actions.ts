import {createAction} from '@reduxjs/toolkit';
import { FilmType } from '../../types';

export const setGenre = createAction('film/setGenre', (genre: string) => ({payload: genre}));
export const loadFilms = createAction('data/loadFilms', (films: FilmType[]) => ({payload: films}));
export const setError = createAction<string>('game/setError');
