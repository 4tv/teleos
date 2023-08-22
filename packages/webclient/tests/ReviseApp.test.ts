import { ReviseApp } from '../src/ReviseApp';
import {
  addSearchLocation,
  settings,
  successfulResponseMock,
  url,
} from './common';

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

// The test below is a unit test for the ReviseApp class.
describe('ReviseApp tests', function () {
  it('should create ReviseApp instance', () => {
    const reviseApp = new ReviseApp(settings);
    expect(reviseApp).toBeInstanceOf(ReviseApp);
  });

  it('should call init method', () => {
    addSearchLocation(windowSpy, 'revise');

    const reviseApp = new ReviseApp(settings);
    const initSpy = jest.spyOn(reviseApp, 'init');
    reviseApp.init();
    expect(initSpy).toHaveBeenCalled();
  });

  it('should fail because of a wrong mode (publish instead of revise)', () => {
    addSearchLocation(windowSpy, 'publish');
    expect(() => new ReviseApp(settings).init()).toThrowError(
      'The class can only be used in revise mode'
    );
  });

  it('should revise an app', async () => {
    addSearchLocation(windowSpy, 'revise');

    const reviseApp = new ReviseApp(settings);

    // to execute in the next iteration of the event loop
    setTimeout(() => {
      reviseApp['handlers'].handleSuccess(successfulResponseMock);
    });

    const response = await reviseApp.revise({
      url,
      reloadIntervalSec: Math.floor(Math.random() * 10),
    });

    expect(response).toMatchObject(successfulResponseMock);
  });
});
