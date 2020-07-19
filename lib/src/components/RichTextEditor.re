open ReactNative;

[@bs.module "./heroEditorApp"] external heroEditorApp: string = "default";

[@bs.get] external getPaddingProperty: Style.t => Style.size = "padding";
[@bs.get] external getFontSizeProperty: Style.t => float = "fontSize";

type editorLayout = {
  width: float,
  height: float,
};

let getSize = (dict, size) =>
  dict
  ->Js.Dict.get(size)
  ->Belt.Option.flatMap(Js.Json.decodeNumber)
  ->Belt.Option.getExn;

let emitter = RichTextEditor__Event.emitter;

let noop = _ => ();

let isEmptyString = string_ => String.length(string_) == 0;

let defaultValue =
  Js.Json.parseExn(
    {| [{ "type": "paragraph", "children": [{ "text": "" }] }] |},
  );

[@react.component]
let make =
    (
      ~name: string,
      ~placeholder: string="",
      ~initialValue: Js.Json.t=defaultValue,
      ~onChange=noop,
      ~onCursorChange=noop,
      ~theme=Hero_Theme.default,
    ) => {
  open React.Ref;
  module Option = Belt.Option;
  module Json = Js.Json;
  module Dict = Js.Dict;

  let normalizeEventName = event => {j|$name/$event|j};

  let webview = React.useRef(Js.Null.empty);
  let (webviewHeight, setWebviewHeight) = React.useState(_ => None);

  let postMessageToWebview = message =>
    webview->current->Js.Null.getUnsafe->RNWebView.postMessage(message);

  let html =
    React.useMemo0(() => {
      let initialValue = initialValue->Json.stringify;

      let padding = theme##richTextEditor##editor->getPaddingProperty;
      let fontSize = theme##richTextEditor##editor->getFontSizeProperty;

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
              initialValue: $initialValue,
              autoFocus: true,
              style: {
                padding: 0,
                paddingTop: $padding,
                paddingBottom: $padding,
                fontSize: $fontSize
              }
            };
            $heroEditorApp
          </script>
        </body>
      </html>
      |j};
    });

  React.useEffect0(() => {
    let removeBoldListener =
      Events.on'(emitter, normalizeEventName("bold"), _ =>
        postMessageToWebview(
          RNWebView.message(
            ~type_="@hero-editor/webview/bold",
            ~data=Json.null,
          ),
        )
      );

    let removeMentionApplyListener =
      Events.on'(emitter, normalizeEventName("mention-apply"), data =>
        postMessageToWebview(
          RNWebView.message(
            ~type_="@hero-editor/webview/mention-apply",
            ~data=data->Option.getExn,
          ),
        )
      );

    Some(
      () => {
        removeBoldListener();
        removeMentionApplyListener();
      },
    );
  });

  let onMessage =
    React.useCallback0(event => {
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

      let messageData = message->Dict.get("data");

      switch (messageType) {
      | "@hero-editor/webview/editor-focus" =>
        Events.emit(emitter, normalizeEventName("editor-focus"), None)

      | "@hero-editor/webview/editor-blur" =>
        Events.emit(emitter, normalizeEventName("editor-blur"), None)

      | "@hero-editor/webview/mention-search" =>
        Events.emit(
          emitter,
          normalizeEventName("mention-search"),
          messageData,
        )

      | "@hero-editor/webview/editor-change" =>
        let value: Json.t =
          messageData
          ->Option.flatMap(Json.decodeObject)
          ->Option.flatMap(data => Dict.get(data, "value"))
          ->Option.getExn;

        onChange(value);

      | "@hero-editor/webview/cursor-change" =>
        onCursorChange(messageData->Option.getExn)

      | "@hero-editor/webview/editor-layout" =>
        let editorLayout: editorLayout =
          messageData
          ->Option.flatMap(Json.decodeObject)
          ->Option.map(data =>
              {
                width: getSize(data, "width"),
                height: getSize(data, "height"),
              }
            )
          ->Option.getExn;

        setWebviewHeight(_ => Some(editorLayout.height->Style.dp));

      | _ => ()
      };
    });

  <RNWebView
    ref=webview
    originWhitelist=[|"*"|]
    source={"html": html}
    onMessage
    hideKeyboardAccessoryView=true
    keyboardDisplayRequiresUserAction=false
    scrollEnabled=false
    style={StyleSheet.flatten([|
      theme##richTextEditor##webview,
      Style.style(~height=?webviewHeight, ()),
    |])}
  />;
};

[@bs.set]
external setToolbarSubComponent:
  (React.component('props1), React.component('props2)) => unit =
  "Toolbar";

[@bs.set]
external setMentionListSubComponent:
  (React.component('props1), React.component('props2)) => unit =
  "MentionList";

setToolbarSubComponent(make, RichTextEditor__Toolbar.make);
setMentionListSubComponent(make, RichTextEditor__MentionList.make);

let default = Helpers.injectTheme(make);
