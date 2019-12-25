[@bs.module "../helpers/injectTheme.js"]
external injectTheme: React.component('props) => React.component('props) =
  "default";

let hasHomeBar = () => {
  let window = ReactNative.Dimensions.get(`window);
  let isLandscape = window##width > window##height;

  let bottomPadding = RNSafeAreaView.getInset(`bottom, Some(isLandscape));
  bottomPadding > 0.0;
};

module Platform = {
  let isAndroid = ReactNative.(Platform.os == Platform.android);
  let isIOS = ReactNative.(Platform.os == Platform.ios);
};
