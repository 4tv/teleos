import { SuccessfulResponse } from '../src/types';

export { url, settings, successfulResponseMock, addSearchLocation };

const settings = {
  appId: Math.random().toString(),
  token: Math.random().toString(),
};

const url = 'https://test.com';

const successfulResponseMock = <SuccessfulResponse>{
  url,
  entryId: Math.random().toString(),
  appId: settings.appId,
  clientId: 'test',
  jwt: 'test',
};

/**
 * Appends the mode to the window.location.search property
 */
const addSearchLocation = (
  windowSpy: jest.SpyInstance,
  mode: ('revise' | 'publish') | string
) => {
  windowSpy.mockImplementation(() => ({
    addEventListener: jest.fn(),
    location: {
      search: `?mode=${mode}`,
    },
  }));
};
