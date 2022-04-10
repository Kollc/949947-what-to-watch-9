import { APIRoute } from './../consts';
import { AppDispatch } from './../types/state';
import request from 'axios';
import { HttpCode } from '../consts';
import { clearErrorAction } from '../store/actions/api-actions';
import { setError } from '../store/film-process/film-process';
import { ErrorType } from '../types';
import { setUserError } from '../store/user-process/user-process';

export const errorHandle = (error: ErrorType, dispatch: AppDispatch): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const handleError = (message: string) => {
    dispatch(setError(message));
    dispatch(clearErrorAction());
  };

  const handleUserError = (message: string) => {
    dispatch(setUserError(message));
  };

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        if(response.config.url === APIRoute.Login) {
          handleUserError(response.data.error);
        } else {
          handleError(response.data.error);
        }
        break;
      case HttpCode.Unauthorized:
      case HttpCode.NotFound:
      default:
        handleError(response.data.error);
        break;
    }
  }
};
