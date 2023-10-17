export {
  PublishQueryPayload,
  Settings,
  EventHandlers,
  ReadyOptions,
  PublishEventHandlers,
  ReviseEventHandlers,
  PublishTicket,
  SuccessfulResponse,
};

type PublishQueryPayload = {
  url: string;

  /**
   * Restricts the navigation of a webpage. By default, it is set to `true`.
   * Its primary function is to limit transitions between different URLs.
   * Optional.
   *
   * For instance, if a user is on the page "https://domain1.com/page1",
   * and tries to navigate to another website (e.g., "https://domain2.com")
   * by clicking a link, the feature would prevent the navigation to that
   * new domain (domain2.com).
   *
   * This could be used as a security feature to prevent users from accidentally
   * navigating to malicious websites,
   * or to keep users within a certain web ecosystem.
   *
   * Despite this restriction, internal navigation is still permitted.
   * That means a user can navigate to different pages within wildcard
   * "https://domain1.com/page1/*" without any restrictions.
   *
   * For example, if the user is on "https://domain1.com/page1"
   * and clicks a link to "https://domain1.com/page1/about", the navigation
   * would be allowed because the path within original location.
   * Access to "https://domain1.com/page2" will be blocked
   * because the URL is in a different scope.
   */
  preventNavigation?: boolean;

  /**
   * Interval in seconds to reload the webpage.
   * Optional.
   *
   * Useful when the webpage needs refreshing to reflect data changes,
   * or when there's a memory leak in the client-side JavaScript code that needs addressing.
   */
  reloadIntervalSec?: number;

  /**
   * Inject the CSS styles into the webpage.
   * Optional.
   *
   * Example:
   * ```css
   * body { overflow:hidden }
   * ```
   */
  injectCSS?: string;

  /**
   * Inject JavaScript into the webpage.
   * Optional.
   *
   * Example:
   * ```js
   * document.querySelector('textarea').value="example@test.com"
   * document.querySelector('role="button"').click()
   * ```
   */
  injectJS?: string;
};

// Configuration settings for the webclient constructor.
type Settings = {
  /**
   * Provide the appId that you received from the developer portal
   * when you registered your application.
   */
  appId: string;

  /**
   * Provide the token that you received from the developer portal
   * when you registered your application.
   */

  token: string;
  /**
   * Part of  window.postMessage() method for cross-origin communication
   * between Teleos CMS and your iframed web application.
   *
   * Optional. The default value is `https://my.teleos.io`.
   */
  targetOrigin?: string;

  /**
   * Activate logging of debug messages.
   * Optional.
   * You can provide ``console.log`` or any other function that accepts
   * a string as the first argument and an object as the second argument.
   */
  debug?: (message: string, meta?: { [key: string]: string }) => void;
};

type ReadyOptions = {
  /**
   * Determines whether the application should be displayed in full-screen mode or not.
   * Optional.
   * When set to `true`, the application will occupy the entire screen of the user's device,
   * maximizing the content visibility and providing an immersive experience.
   */
  fullScreen?: boolean;

  /**
   * Set height implicitly, if not set gets from document.body.scrollHeight.
   */
  height?: string;
};

interface PublishTicket {
  appId: string;
  clientId: string;
  /**
   * JSON Web Token to authenticate the response.
   */
  jwt: string;
}

interface SuccessfulResponse extends PublishTicket {
  url: string;
  entryId: string;
}

type ReviseTicket = SuccessfulResponse;

interface PublishEventHandlers {
  readyReceived: (params: PublishTicket) => void;
  handleSuccess: (params: SuccessfulResponse) => void;
  handleFailure: (params: PublishTicket & { reason: string }) => void;
}

interface ReviseEventHandlers {
  readyReceived: (params: ReviseTicket) => void;
  handleSuccess: (params: SuccessfulResponse) => void;
  handleFailure: (params: ReviseTicket & { reason: string }) => void;
}

type EventHandlers = PublishEventHandlers | ReviseEventHandlers;
