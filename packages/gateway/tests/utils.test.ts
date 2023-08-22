import { invariant, getSplittedJwt } from '../src/utils';

describe('Checks invariant', function () {
  it('should throw error', () => {
    expect(getSplittedJwt('111.222.333')).toEqual({
      header: '111',
      body: '222',
      signature: '333',
    });
  });
});

describe('Checks invariant', function () {
  it('should throw error', () => {
    expect(() => invariant(false, 'some error')).toThrowError('some error');
  });
  it('should not throw error', () => {
    expect(() => invariant(true, 'some error')).not.toThrowError('some error');
  });
});
