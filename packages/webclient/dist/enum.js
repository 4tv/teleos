"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebClientReadonlyProperty = exports.HostMessage = exports.ClientMode = exports.ClientMessage = void 0;
var ClientMessage;
(function (ClientMessage) {
    ClientMessage["AppReady"] = "appReady";
    ClientMessage["Publish"] = "publish";
    ClientMessage["Revise"] = "revise";
    ClientMessage["ShowLoading"] = "showLoading";
    ClientMessage["HideLoading"] = "hideLoading";
    ClientMessage["Complete"] = "complete";
    ClientMessage["ClientError"] = "clientError";
})(ClientMessage || (exports.ClientMessage = ClientMessage = {}));
var WebClientReadonlyProperty;
(function (WebClientReadonlyProperty) {
    WebClientReadonlyProperty["BaseOrigin"] = "https://my.teleos.io";
    WebClientReadonlyProperty["HostSource"] = "teleosHost";
    WebClientReadonlyProperty["ClientSource"] = "teleosClient";
})(WebClientReadonlyProperty || (exports.WebClientReadonlyProperty = WebClientReadonlyProperty = {}));
var ClientMode;
(function (ClientMode) {
    ClientMode["Publish"] = "publish";
    ClientMode["Revise"] = "revise";
})(ClientMode || (exports.ClientMode = ClientMode = {}));
var HostMessage;
(function (HostMessage) {
    HostMessage["ReadyReceived"] = "readyReceived";
    HostMessage["PublishEntrySuccess"] = "publishEntrySuccess";
    HostMessage["PublishEntryFailed"] = "publishEntryFailed";
    HostMessage["ReviseEntrySuccess"] = "reviseEntrySuccess";
    HostMessage["ReviseEntryFailed"] = "reviseEntryFailed";
    HostMessage["Info"] = "info";
})(HostMessage || (exports.HostMessage = HostMessage = {}));
//# sourceMappingURL=enum.js.map