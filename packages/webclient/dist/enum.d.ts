export { ClientMessage, ClientMode, HostMessage, WebClientReadonlyProperty };
declare enum ClientMessage {
    AppReady = "appReady",
    Publish = "publish",
    Revise = "revise",
    ShowLoading = "showLoading",
    HideLoading = "hideLoading",
    Complete = "complete",
    ClientError = "clientError"
}
declare enum WebClientReadonlyProperty {
    BaseOrigin = "https://my.teleos.io",
    HostSource = "teleosHost",
    ClientSource = "teleosClient"
}
declare enum ClientMode {
    Publish = "publish",
    Revise = "revise"
}
declare enum HostMessage {
    ReadyReceived = "readyReceived",
    PublishEntrySuccess = "publishEntrySuccess",
    PublishEntryFailed = "publishEntryFailed",
    ReviseEntrySuccess = "reviseEntrySuccess",
    ReviseEntryFailed = "reviseEntryFailed",
    Info = "info"
}
