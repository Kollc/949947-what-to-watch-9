import { NameSpace } from '../../consts';
import {State} from '../../types/state';

export const getError = (state: State): string => state[NameSpace.film].error;
