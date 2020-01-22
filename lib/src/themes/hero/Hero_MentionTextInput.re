open ReactNative.Style;
open Hero_Variables;

let _TEXT_FONT_SIZE = _HEADER_4;
let _TEXT_COLOR = Hero_Variables._TEXT_COLOR;
let _HIGHLIGHT_TEXT_COLOR = _LIGHT_PRIMARY_COLOR;

let styles: Js.t('a) = {
  "text":
    style(
      ~fontFamily=?_FONT_FAMILY,
      ~fontSize=_TEXT_FONT_SIZE,
      ~color=_TEXT_COLOR,
      (),
    ),
  "highlightText":
    style(~backgroundColor=_HIGHLIGHT_TEXT_COLOR, ~borderRadius=2.0, ()),
};

let default: Js.t('a) = ReactNative.StyleSheet.create(styles);
