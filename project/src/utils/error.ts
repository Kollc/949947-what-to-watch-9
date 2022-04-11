import request from 'axios';
import { HttpCode } from '../consts';
import { ErrorType } from '../types';

export const getErrorMessage = (error: ErrorType): string => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    return response.data.error;
  }

  return  '';
};

export const getErrorStatus = (error: ErrorType): number => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    return response.status;
  }

  return  HttpCode.Ok;
};
