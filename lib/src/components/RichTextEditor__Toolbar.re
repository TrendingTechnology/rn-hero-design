open ReactNative;

let emitter = RichTextEditor__Event.emitter;

module ToolbarButton = {
  [@react.component]
  let make = (~icon, ~onPress, ~theme=Hero_Theme.default) =>
    <TouchableOpacity onPress style=theme##richTextEditor##toolbarButton>
      <Icon icon />
    </TouchableOpacity>;

  let make = Helpers.injectTheme(make);
};

[@react.component]
let make = (~name: string, ~theme=Hero_Theme.default) => {
  let normalizeEventName = event => {j|$name/$event|j};

  let (show, setShow) = React.useState(() => false);

  React.useEffect0(() => {
    let removeFocusListener =
      Events.on'(emitter, normalizeEventName("editor-focus"), _ =>
        setShow(_ => true)
      );

    let removeBlurListener =
      Events.on'(emitter, normalizeEventName("editor-blur"), _ =>
        setShow(_ => false)
      );

    Some(
      () => {
        removeFocusListener();
        removeBlurListener();
      },
    );
  });

  show
    ? <View style=theme##richTextEditor##toolbar>
        <ToolbarButton
          icon="format_bold"
          onPress={_ => {
            Events.emit(emitter, normalizeEventName("bold"), None)
          }}
        />
        <ToolbarButton
          icon="format_italic"
          onPress={_ => {
            Events.emit(emitter, normalizeEventName("italic"), None)
          }}
        />
        <ToolbarButton
          icon="format_underlined"
          onPress={_ => {
            Events.emit(emitter, normalizeEventName("underline"), None)
          }}
        />
        <View style=theme##richTextEditor##separator />
        <ToolbarButton
          icon="format_list_bulleted"
          onPress={_ => {
            Events.emit(emitter, normalizeEventName("bulleted-list"), None)
          }}
        />
        <ToolbarButton
          icon="format_list_numbered"
          onPress={_ => {
            Events.emit(emitter, normalizeEventName("numbered-list"), None)
          }}
        />
      </View>
    : React.null;
};

let default = Helpers.injectTheme(make);
