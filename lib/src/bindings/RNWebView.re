type element;

[@bs.deriving abstract]
type message = {
  [@bs.as "type"]
  type_: string,
  data: Js.Json.t,
};

type event = {. "nativeEvent": {. "data": string}};

[@bs.send]
external injectJavaScript: (element, string) => unit = "injectJavaScript";

let requestFocus = element => {
  injectJavaScript(
    element,
    {j|
    window.document.getElementsByClassName('hero-editor--editable')[0].focus();
    |j},
  );
};

let postMessage = (element, message) => {
  let message = message->Js.Json.stringifyAny->Belt.Option.getExn;
  injectJavaScript(element, {j|window.postMessage($message, '*');|j});
};

[@react.component] [@bs.module "react-native-webview"]
external make:
  (
    ~ref: React.Ref.t(Js.Null.t(element))=?,
    ~originWhitelist: array(string),
    ~source: {. "html": string},
    ~onMessage: event => unit,
    ~hideKeyboardAccessoryView: bool=?,
    ~keyboardDisplayRequiresUserAction: bool=?,
    ~scrollEnabled: bool=?,
    ~style: ReactNative.Style.t=?
  ) =>
  React.element =
  "WebView";
