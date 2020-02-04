open ReactNative.Style;
open Hero_Variables;

let _GLOBAL_BACKGROUND_COLOR = _BACKGROUND_COLOR;
let _BORDER_RADIUS = _SMALL_SIZE;

let styles: Js.t('a) = {
  "wrapper": style(),
  "navigator":
    style(
      ~flexDirection=`row,
      ~justifyContent=`spaceBetween,
      ~alignItems=`center,
      ~paddingHorizontal=_SMALL_SIZE->dp,
      ~paddingVertical=_MEDIUM_SIZE->dp,
      (),
    ),
  "dayContainer": style(~flexDirection=`row, ~flexWrap=`wrap, ()),
  "day":
    style(
      ~flexDirection=`row,
      ~flexBasis=100.0->(/.)(7.0)->pct,
      ~justifyContent=`center,
      ~paddingVertical=_SMALL_SIZE->dp,
      (),
    ),
  "dayText":
    style(
      ~fontSize=_HEADER_4,
      ~fontFamily=?_FONT_FAMILY,
      ~color=_MUTED_TEXT_COLOR,
      (),
    ),
  "currentDayText": style(~color=_TEXT_COLOR, ()),
  "selectedDay":
    style(
      ~position=`absolute,
      ~alignSelf=`center,
      ~width=(_MEDIUM_SIZE *. 2.0)->dp,
      ~height=(_MEDIUM_SIZE *. 2.0)->dp,
      ~backgroundColor=_PRIMARY_COLOR,
      ~borderRadius=_MEDIUM_SIZE,
      (),
    ),
  "dayLabel":
    style(~fontSize=_HEADER_5, ~fontWeight=`_600, ~color=_TEXT_COLOR, ()),
};

let default: Js.t('a) = ReactNative.StyleSheet.create(styles);
