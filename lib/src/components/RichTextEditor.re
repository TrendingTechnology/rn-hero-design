open ReactNative;

module WebView = {
  type element;
  type message('a) = {
    .
    "type": string,
    "data": Js.t('a),
  };

  [@bs.send]
  external injectJavaScript: (element, string) => unit = "injectJavaScript";

  let postMessage = (element, message) => {
    let message = message->Js.Json.stringifyAny->Belt.Option.getExn;
    injectJavaScript(element, {j|window.postMessage($message, '*');|j});
  };

  [@react.component] [@bs.module "react-native-webview"]
  external make:
    (
      ~ref: React.Ref.t(Js.Null.t(element))=?,
      ~originWhitelist: array(string),
      ~source: {. "html": string}
    ) =>
    React.element =
    "WebView";
};

[@bs.module "./heroEditorApp"] external heroEditorApp: string = "default";

let html = {j|
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      $heroEditorApp
    </script>
  </body>
</html>
|j};

[@react.component]
let make = (~theme=Hero_Theme.default) => {
  open React.Ref;

  let webview = React.useRef(Js.Null.empty);

  <View style=theme##richTextEditor##wrapper>
    <View style=theme##richTextEditor##toolbar>
      <TouchableOpacity
        onPress={_ => {
          webview
          ->current
          ->Js.Null.getUnsafe
          ->WebView.postMessage({
              "type": "@hero-editor/webview/bold",
              "data": Js.Obj.empty(),
            });
          ();
        }}
        style=theme##richTextEditor##toolbarButton>
        <Icon icon="format_bold" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_ => {
          webview
          ->current
          ->Js.Null.getUnsafe
          ->WebView.postMessage({
              "type": "@hero-editor/webview/italic",
              "data": Js.Obj.empty(),
            });
          ();
        }}
        style=theme##richTextEditor##toolbarButton>
        <Icon icon="format_italic" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_ => {
          webview
          ->current
          ->Js.Null.getUnsafe
          ->WebView.postMessage({
              "type": "@hero-editor/webview/underline",
              "data": Js.Obj.empty(),
            });
          ();
        }}
        style=theme##richTextEditor##toolbarButton>
        <Icon icon="format_underlined" />
      </TouchableOpacity>
    </View>
    <WebView ref=webview originWhitelist=[|"*"|] source={"html": html} />
  </View>;
};

let default = Helpers.injectTheme(make);
