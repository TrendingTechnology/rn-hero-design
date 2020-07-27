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

module Source = {
  type t;

  [@bs.obj]
  external uri:
    (
      ~uri: string=?,
      ~method: string=?,
      ~headers: Js.t('a)=?,
      ~body: string=?,
      unit
    ) =>
    t =
    "";

  [@bs.obj]
  external html: (~html: string=?, ~baseUrl: string=?, unit) => t = "";
};

[@react.component] [@bs.module "react-native-webview"]
external make:
  (
    ~ref: React.Ref.t(Js.Null.t(element))=?,
    ~originWhitelist: array(string),
    ~source: Source.t,
    ~onMessage: event => unit,
    ~hideKeyboardAccessoryView: bool=?,
    ~keyboardDisplayRequiresUserAction: bool=?,
    ~scrollEnabled: bool=?,
    ~style: ReactNative.Style.t=?
  ) =>
  React.element =
  "WebView";
