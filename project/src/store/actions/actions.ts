import { AppRoute } from './../../consts';
import {createAction} from '@reduxjs/toolkit';

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');

