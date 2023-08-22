import crypto from 'crypto';

import { getSplittedJwt } from '../src/utils';
import { verifyReviseToken } from '../src/verifyReviseToken';

const testJwt =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJ0ZXN0QXBwIiwiY2lkIjoiQVZhdGYwUzY3UkIxNlhCVE81cytlcTFVM3l3PSIsImVpZCI6Im9xRktnUE1FdmdyQUtkVzN4OWtsVTVwRmhGND0iLCJ1cmwiOiJ0ZXN0VXJsIiwiaWF0IjoxNjkxMTE5NjIyLCJleHAiOjE2OTExMTk2ODIsImF1ZCI6InRlc3RBcHAiLCJpc3MiOiJUb1N2MSJ9.fWnpfVTyHnnsr8VZwHvxsuOPeSUzoLozBuJfKfDfPuCLyjeYYD1NiDNeR_jiBpqmmmhKpgDa1c6drhwziBCXQhacquAnC9-uZchpu114hqimhh5Oz08IWmfiiOXmubFAPhRE0z1nrcl8qr7SzCskuSP9t6Odd6CzK1vZtmYuyMHsaeDuSe1iMdVW1NTQj63ri3YDx6BUO_jK546LRlSLTaOwyFAtHrf3MKu8L2GDmWF8RVT3w4W3yJs9YZqqmWyPgAwrHsWbmCRcaFuxdfEbqNKCrmkm8X60rfRzORNM-TBT_0YOvi12JOEmUyeqPzEyCmmEpa5nz2zhu-qXpf51jQ';

// Split JWT into 3 parts, header, payload and signature
const splittedJwt = getSplittedJwt(testJwt);

const randomToken = crypto.randomBytes(48).toString('base64url');

describe('Verify revise token tests', function () {
  it('should succefssfully verify a revise token', () => {
    expect(verifyReviseToken(testJwt, { errorIfExpired: false })).toEqual({
      appId: 'testApp',
      clientId: 'AVatf0S67RB16XBTO5s+eq1U3yw=',
      createdAt: 1691119622000,
      expirationAt: 1691119682000,
      isExpired: true,
      entryId: 'oqFKgPMEvgrAKdW3x9klU5pFhF4=',
      url: 'testUrl',
    });
  });

  it('should throw expired erorr', () => {
    expect(() => verifyReviseToken(testJwt)).toThrowError('Token is expired');
  });

  it('should throw error because of damaged header', () => {
    expect(() =>
      verifyReviseToken(testJwt.replace(splittedJwt.header, randomToken))
    ).toThrowError('Invalid JWT');
  });

  it('should throw error because of damaged payload', () => {
    expect(() =>
      verifyReviseToken(testJwt.replace(splittedJwt.body, randomToken))
    ).toThrowError('Invalid JWT');
  });

  it('should throw error because of damaged signature', () => {
    expect(() =>
      verifyReviseToken(testJwt.replace(splittedJwt.signature, randomToken))
    ).toThrowError('Invalid JWT signature');
  });
});
