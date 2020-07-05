open ReactNative;

let isEmptyString = string_ => String.length(string_) == 0;

[@bs.get] external getPaddingProperty: Style.t => Style.size = "padding";
[@bs.get] external getFontSizeProperty: Style.t => float = "fontSize";

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
      ~style: Style.t=?
    ) =>
    React.element =
    "WebView";
};

module ToolbarButton = {
  [@react.component]
  let make = (~icon, ~onPress, ~theme=Hero_Theme.default) =>
    <TouchableOpacity onPress style=theme##richTextEditor##toolbarButton>
      <Icon icon />
    </TouchableOpacity>;

  let make = Helpers.injectTheme(make);
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
  let (showToolbar, setShowToolbar) = React.useState(() => false);
  let (mentionSearch, setMentionSearch) = React.useState(() => "");
  let (mentionTarget, setMentionTarget) = React.useState(() => Js.Json.null);

  let html =
    React.useMemo0(() => {
      let initialValue = initialValue->Js.Json.stringify;

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
                padding: $padding,
                fontSize: $fontSize
              }
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

      switch (messageType) {
      | "@hero-editor/webview/mention-search" =>
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
      | "@hero-editor/webview/editor-focus" => setShowToolbar(_ => true)
      | "@hero-editor/webview/editor-blur" => setShowToolbar(_ => false)
      | _ => ()
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
      hideKeyboardAccessoryView=true
      keyboardDisplayRequiresUserAction=false
      style=theme##richTextEditor##webview
    />
    {isEmptyString(mentionSearch)
       ? React.null
       : <View style=theme##richTextEditor##suggestionList>
           {renderSuggestionList(
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
         </View>}
    {showToolbar
       ? <View style=theme##richTextEditor##toolbar>
           <ToolbarButton
             icon="format_bold"
             onPress={_ => {
               postMessageToWebview(
                 WebView.message(
                   ~type_="@hero-editor/webview/bold",
                   ~data=Js.Json.null,
                 ),
               )
             }}
           />
           <ToolbarButton
             icon="format_italic"
             onPress={_ => {
               postMessageToWebview({
                 "type": "@hero-editor/webview/italic",
                 "data": Js.Json.null,
               })
             }}
           />
           <ToolbarButton
             icon="format_underlined"
             onPress={_ => {
               postMessageToWebview({
                 "type": "@hero-editor/webview/underline",
                 "data": Js.Json.null,
               })
             }}
           />
           <View style=theme##richTextEditor##separator />
           <ToolbarButton
             icon="format_list_bulleted"
             onPress={_ => {
               postMessageToWebview({
                 "type": "@hero-editor/webview/bulleted-list",
                 "data": Js.Json.null,
               })
             }}
           />
           <ToolbarButton
             icon="format_list_numbered"
             onPress={_ => {
               postMessageToWebview({
                 "type": "@hero-editor/webview/numbered-list",
                 "data": Js.Json.null,
               })
             }}
           />
         </View>
       : React.null}
  </View>;
};

let default = Helpers.injectTheme(make);
