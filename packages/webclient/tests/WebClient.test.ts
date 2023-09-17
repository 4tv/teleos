import { WebClient } from '../src/WebClient';
import { addSearchLocation } from './common';

// Hack to test the abstract class
class TestWebClient extends WebClient {}

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('WebClient tests', function () {
  it('should create WebClient instance', () => {
    const webClient = new TestWebClient({
      appId: 'test',
      token: 'test',
    });
    expect(webClient).toBeInstanceOf(WebClient);
  });
});

it('should have get mode property', () => {
  ['publish', 'publish', undefined].forEach((mode) => {
    addSearchLocation(windowSpy, mode as 'publish');
    expect(TestWebClient.getMode()).toBe(mode);
  });
});
