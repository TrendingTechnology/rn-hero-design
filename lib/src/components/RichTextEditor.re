open ReactNative;

let isEmptyString = string_ => String.length(string_) == 0;

module WebView = {
  type element;

  [@bs.deriving abstract]
  type message('a) = {
    [@bs.as "type"]
    type_: string,
    data: 'a,
  };

  type event = {. "nativeEvent": {. "data": string}};

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
      ~source: {. "html": string},
      ~onMessage: event => unit
    ) =>
    React.element =
    "WebView";
};

[@bs.module "./heroEditorApp"] external heroEditorApp: string = "default";

let defaultValue =
  Js.Json.parseExn(
    {| [{ "type": "paragraph", "children": [{ "text": "" }] }] |},
  );

[@react.component]
let make =
    (
      ~placeholder: string="",
      ~initialValue: Js.Json.t=defaultValue,
      ~renderSuggestionList,
      ~theme=Hero_Theme.default,
    ) => {
  open React.Ref;

  let webview = React.useRef(Js.Null.empty);
  let (mentionSearch, setMentionSearch) = React.useState(() => "");
  let (mentionTarget, setMentionTarget) = React.useState(() => Js.Json.null);

  let html =
    React.useMemo0(() => {
      let initialValue = initialValue->Js.Json.stringify;

      {j|
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
            window.__editorConfigs = {
              placeholder: "$placeholder",
              initialValue: $initialValue
            };
            $heroEditorApp
          </script>
        </body>
      </html>
      |j};
    });

  let onMessage =
    React.useCallback0(event => {
      module Option = Belt.Option;
      module Json = Js.Json;
      module Dict = Js.Dict;

      let message =
        event##nativeEvent##data
        ->Json.parseExn
        ->Json.decodeObject
        ->Option.getExn;

      let messageType =
        message
        ->Dict.get("type")
        ->Option.flatMap(Json.decodeString)
        ->Option.getExn;

      if (messageType === "@hero-editor/webview/mention-search") {
        let search =
          message
          ->Dict.get("data")
          ->Option.flatMap(Json.decodeObject)
          ->Option.flatMap(data => Dict.get(data, "search"))
          ->Option.flatMap(Json.decodeString)
          ->Option.getExn;

        let target =
          message
          ->Dict.get("data")
          ->Option.flatMap(Json.decodeObject)
          ->Option.flatMap(data => Dict.get(data, "target"))
          ->Option.getExn;

        setMentionSearch(_ => search);
        setMentionTarget(_ => target);
      } else {
        ();
      };
    });

  let postMessageToWebview = message =>
    webview->current->Js.Null.getUnsafe->WebView.postMessage(message);

  <View style=theme##richTextEditor##wrapper>
    <WebView
      ref=webview
      originWhitelist=[|"*"|]
      source={"html": html}
      onMessage
    />
    {isEmptyString(mentionSearch)
       ? React.null
       : renderSuggestionList(
           mentionSearch,
           (id, name) => {
             let meta = Js.Dict.empty();
             Js.Dict.set(meta, "target", mentionTarget);

             let data = Js.Dict.empty();
             Js.Dict.set(data, "id", Js.Json.string(id));
             Js.Dict.set(data, "name", Js.Json.string(name));
             Js.Dict.set(data, "meta", Js.Json.object_(meta));

             postMessageToWebview(
               WebView.message(
                 ~type_="@hero-editor/webview/mention-apply",
                 ~data=Js.Json.object_(data),
               ),
             );
           },
         )}
    <View style=theme##richTextEditor##toolbar>
      <TouchableOpacity
        onPress={_ => {
          postMessageToWebview(
            WebView.message(
              ~type_="@hero-editor/webview/bold",
              ~data=Js.Json.null,
            ),
          )
        }}
        style=theme##richTextEditor##toolbarButton>
        <Icon icon="format_bold" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_ => {
          postMessageToWebview({
            "type": "@hero-editor/webview/italic",
            "data": Js.Json.null,
          })
        }}
        style=theme##richTextEditor##toolbarButton>
        <Icon icon="format_italic" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_ => {
          postMessageToWebview({
            "type": "@hero-editor/webview/underline",
            "data": Js.Json.null,
          })
        }}
        style=theme##richTextEditor##toolbarButton>
        <Icon icon="format_underlined" />
      </TouchableOpacity>
      <View style=theme##richTextEditor##separator />
    </View>
  </View>;
};

/* let default = Helpers.injectTheme(make); */
let default = make;
