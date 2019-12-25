[@bs.module "../helpers/injectTheme.js"]
external injectTheme: React.component('props) => React.component('props) =
  "default";

module Platform = {
  let isAndroid = ReactNative.(Platform.os == Platform.android);
  let isIOS = ReactNative.(Platform.os == Platform.ios);
};
