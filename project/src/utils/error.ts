import request from 'axios';
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
