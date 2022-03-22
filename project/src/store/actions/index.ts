import {createAction} from '@reduxjs/toolkit';

export const setGenre = createAction('film/setGenre', (genre: string) => ({payload: genre}));
export const setFilmsByGenre = createAction('film/setFilmsByGenre');
export const setFilms = createAction('film/setFilms');
