import { PublishApp } from '../src/PublishApp';
import {
  addSearchLocation,
  successfulResponseMock,
  url,
  settings,
} from './common';

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

// The test below is a unit test for the PublishApp class.
describe('PublishApp tests', function () {
  it('should create PublishApp instance', () => {
    const publishApp = new PublishApp(settings);
    expect(publishApp).toBeInstanceOf(PublishApp);
  });

  it('should call init method', () => {
    addSearchLocation(windowSpy, 'publish');

    const publishApp = new PublishApp(settings);
    const initSpy = jest.spyOn(publishApp, 'init');
    publishApp.init();
    expect(initSpy).toHaveBeenCalled();
  });

  it('should fail because of a wrong mode (revise instead of publish)', () => {
    addSearchLocation(windowSpy, 'revise');

    expect(() => new PublishApp(settings).init()).toThrowError(
      'The class can only be used in publish mode'
    );
  });

  it('should publish an app', async () => {
    addSearchLocation(windowSpy, 'publish');

    const publishApp = new PublishApp(settings);

    // to execute in the next iteration of the event loop
    setTimeout(() => {
      publishApp['handlers'].handleSuccess(successfulResponseMock);
    });

    const response = await publishApp.publish({
      url,
      reloadIntervalSec: Math.floor(Math.random() * 10),
    });

    expect(response).toMatchObject(successfulResponseMock);
  });
});
