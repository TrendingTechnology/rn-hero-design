[@bs.module "../helpers/injectTheme.js"]
external injectTheme: React.component('props) => React.component('props) =
  "default";

let isLandscape = () => {
  let window = ReactNative.Dimensions.get(`window);
  window.width > window.height;
};

let hasHomeBar = () => {
  let bottomPadding = RNSafeAreaView.getInset(`bottom, isLandscape()->Some);
  bottomPadding > 0.0;
};

module Platform = {
  let isAndroid = ReactNative.(Platform.os == Platform.android);
  let isIOS = ReactNative.(Platform.os == Platform.ios);
};

[@bs.module "react-redux"]
external useSelector: (Js.t('a) => 'b) => 'b = "useSelector";

[@bs.scope "default"] [@bs.module "../helpers/themeManager.js"]
external getTheme: (~name: string) => Js.t('a) = "getTheme";

let useTheme = () => {
  let themeName = useSelector(state => state##__theme);
  getTheme(~name=themeName);
};
