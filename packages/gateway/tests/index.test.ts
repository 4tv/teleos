import { verifyPublishToken, verifyReviseToken } from '../src/index';

describe('Checks lib entry point', function () {
  it('should export verifyPublishToken', () => {
    expect(verifyPublishToken).toBeTruthy();
  });

  it('should export verifyReviseToken', () => {
    expect(verifyReviseToken).toBeTruthy();
  });
});
