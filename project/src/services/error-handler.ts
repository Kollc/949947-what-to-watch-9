import request from 'axios';
import { HTTP_CODE } from '../consts';
import { setError } from '../store/film-process/film-process';
// import { clearErrorAction } from '../store/actions/api-actions';
import { store } from '../store/store';
import { ErrorType } from '../types';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const handleError = (message: string) => {
    store.dispatch(setError(message));
    // store.dispatch(clearErrorAction());
  };

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
      case HTTP_CODE.UNAUTHORIZED:
      case HTTP_CODE.NOT_FOUND:
        handleError(response.data.error);
        break;
    }
  }
};
