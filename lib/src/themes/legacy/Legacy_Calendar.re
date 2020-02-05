open ReactNative.Style;
open Legacy_Variables;

let _HEADER_PADDING = _SMALL_SIZE;
let _HEADER_BUTTON_PADDING = _SMALL_SIZE;
let _HEADER_TITLE_FONT_SIZE = _HEADER_4;
let _DAY_TEXT_FONT_SIZE = _HEADER_4;
let _DAY_TEXT_LINE_HEIGHT = _HEADER_4;
let _DAY_TEXT_COLOR = _TEXT_COLOR;
let _DAY_PADDING = _SMALL_SIZE;
let _DAY_HEIGHT = _DAY_TEXT_LINE_HEIGHT +. _DAY_PADDING *. 2.0;
let _DAY_NAME_FONT_SIZE = _HEADER_5;
let _DAY_NAME_COLOR = _MUTED_TEXT_COLOR;
let _SELECTED_DAY_BACKGROUND_COLOR = _PRIMARY_COLOR;
let _SELECTED_DAY_TEXT_COLOR = _WHITE;
let _BLURRED_DAY_TEXT_COLOR = _MUTED_TEXT_COLOR;
let _CURRENT_DAY_TEXT_COLOR = _PRIMARY_COLOR;

let styles: Js.t('a) = {
  "wrapper": style(),
  "header":
    style(
      ~flexDirection=`row,
      ~alignItems=`center,
      ~justifyContent=`spaceBetween,
      ~paddingVertical=_HEADER_PADDING->dp,
      (),
    ),
  "headerButton": style(~padding=_HEADER_BUTTON_PADDING->dp, ()),
  "headerTitle":
    style(
      ~fontFamily=?_FONT_FAMILY,
      ~fontSize=_HEADER_TITLE_FONT_SIZE,
      ~fontWeight=`_500,
      (),
    ),
  "monthView": style(~flexDirection=`row, ~flexWrap=`wrap, ()),
  "day":
    style(
      ~flexDirection=`row,
      ~flexBasis=(100.0 /. 7.0)->pct,
      ~justifyContent=`center,
      ~alignItems=`center,
      ~height=_DAY_HEIGHT->dp,
      ~borderBottomColor="red",
      (),
    ),
  "dayText":
    style(
      ~lineHeight=_DAY_TEXT_LINE_HEIGHT,
      ~fontFamily=?_FONT_FAMILY,
      ~fontSize=_DAY_TEXT_FONT_SIZE,
      ~fontWeight=`_400,
      ~color=_DAY_TEXT_COLOR,
      (),
    ),
  "dayName":
    style(
      ~fontSize=_DAY_NAME_FONT_SIZE,
      ~fontWeight=`_500,
      ~color=_DAY_NAME_COLOR,
      (),
    ),
  "selectedDay":
    style(
      ~position=`absolute,
      ~width=_DAY_HEIGHT->dp,
      ~height=_DAY_HEIGHT->dp,
      ~backgroundColor=_SELECTED_DAY_BACKGROUND_COLOR,
      ~borderRadius=_DAY_HEIGHT /. 2.0,
      (),
    ),
  "selectedDayText": style(~color=_SELECTED_DAY_TEXT_COLOR, ()),
  "blurredDayText": style(~color=_BLURRED_DAY_TEXT_COLOR, ()),
  "currentDayText": style(~color=_CURRENT_DAY_TEXT_COLOR, ()),
};

let default: Js.t('a) = ReactNative.StyleSheet.create(styles);
