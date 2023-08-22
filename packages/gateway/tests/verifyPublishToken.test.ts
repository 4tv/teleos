import crypto from 'crypto';

import { getSplittedJwt } from '../src/utils';
import { verifyPublishToken } from '../src/verifyPublishToken';

const testJwt =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJ0ZXN0QXBwIiwiY2lkIjoiQVZhdGYwUzY3UkIxNlhCVE81cytlcTFVM3l3PSIsImlhdCI6MTY5MDg1OTk4MSwiZXhwIjoxNjkwODU5OTgyLCJhdWQiOiJ0ZXN0QXBwIiwiaXNzIjoiVG9TdjEifQ.jc9Y_1Q-Og5i84JrtIBrI3sUVebIMJ2KPuilyVmxXI1e45bmxs0gSyhCkeGND-htrlaO-yG7hc6poVmP8SuKRcgZHzj_f-AdZLpq8norVJaE0CdSS8-3DCBSvHKW5VHTHzSuEnW2FgcYIW5BdG82O1vyj9v67NGNASCsTrZzBRzBgad8hWUJ6_NWgTqnlCyVKFTAheL-1t5jYWyUan5J_SNRBYOdz3aW7xlsn-pqZJFxq94cHICbo0iErco7W0tywSdXI2WThkidq6y5fkSW-EQot36K4199md3AE62kmietA0cyq6GUcYwcZKA1daw-txegWWjyzcXWhbMuRX3yPQ';

// Split JWT into 3 parts, header, payload and signature
const splittedJwt = getSplittedJwt(testJwt);

const randomToken = crypto.randomBytes(48).toString('base64url');

describe('Verify publish token tests', function () {
  it('should succefssfully verify a publish token', () => {
    expect(verifyPublishToken(testJwt, { errorIfExpired: false })).toEqual({
      appId: 'testApp',
      clientId: 'AVatf0S67RB16XBTO5s+eq1U3yw=',
      createdAt: 1690859981000,
      expirationAt: 1690859982000,
      isExpired: true,
    });
  });

  it('should throw expired erorr', () => {
    expect(() => verifyPublishToken(testJwt)).toThrowError('Token is expired');
  });

  it('should throw error because of damaged header', () => {
    expect(() =>
      verifyPublishToken(testJwt.replace(splittedJwt.header, randomToken))
    ).toThrowError('Invalid JWT');
  });

  it('should throw error because of damaged payload', () => {
    expect(() =>
      verifyPublishToken(testJwt.replace(splittedJwt.body, randomToken))
    ).toThrowError('Invalid JWT');
  });

  it('should throw error because of damaged signature', () => {
    expect(() =>
      verifyPublishToken(testJwt.replace(splittedJwt.signature, randomToken))
    ).toThrowError('Invalid JWT signature');
  });
});
