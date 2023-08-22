export { ClientMessage, ClientMode, HostMessage, WebClientReadonlyProperty };

enum ClientMessage {
  AppReady = 'appReady',
  Publish = 'publish',
  Revise = 'revise',
  ShowLoading = 'showLoading',
  HideLoading = 'hideLoading',
  Complete = 'complete',
  ClientError = 'clientError',
}

enum WebClientReadonlyProperty {
  BaseOrigin = 'https://my.teleos.io',
  HostSource = 'teleosHost',
  ClientSource = 'teleosClient',
}

enum ClientMode {
  Publish = 'publish',
  Revise = 'revise',
}

enum HostMessage {
  ReadyReceived = 'readyReceived',
  PublishEntrySuccess = 'publishEntrySuccess',
  PublishEntryFailed = 'publishEntryFailed',
  ReviseEntrySuccess = 'reviseEntrySuccess',
  ReviseEntryFailed = 'reviseEntryFailed',
  Info = 'info',
}
