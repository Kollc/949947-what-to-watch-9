import { checkValidatePassword } from './validate';

describe('Validate functions', () => {
  it('checkValidatePassword should return is correct value', () => {
    expect(checkValidatePassword('sddsdsdssdds')).not.toBe('');
    expect(checkValidatePassword('34343434543')).not.toBe('');
    expect(checkValidatePassword('0dd9d88d8ss')).toBe('');
  });
});
