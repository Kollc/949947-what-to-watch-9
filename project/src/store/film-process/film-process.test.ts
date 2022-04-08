import { filmProcess, setError } from './film-process';

describe('Reducer: filmProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        error: '',
      });
  });

  it('set error is success', () => {
    const state = {
      error: '',
    };

    expect(filmProcess.reducer(state, setError('Error!')))
      .toEqual({
        error: 'Error!',
      });
  });
});
