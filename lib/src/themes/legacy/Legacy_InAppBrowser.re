open ReactNative.Style;
open Legacy_Variables;

let _HEADER_BACKGROUND_COLOR = _DARK_PRIMARY_COLOR;
let _SMALL_SIZE = _SMALL_SIZE->dp;
let _MEDIUM_SIZE = _MEDIUM_SIZE->dp;
let _TEXT_COLOR = _WHITE;

let styles: Js.t('a) = {
  "wrapper": style(),
  "headerBar":
    style(
      ~height=44.0->dp,
      ~flexDirection=`row,
      ~justifyContent=`spaceBetween,
      ~backgroundColor=_HEADER_BACKGROUND_COLOR,
      ~paddingHorizontal=_MEDIUM_SIZE,
      (),
    ),
  "headerTitle": style(~flex=1.0, ~justifyContent=`center, ()),
  "headerTitleText": style(~textAlign=`center, ~color=_TEXT_COLOR, ()),
  "headerBarLeftButton":
    style(
      ~paddingLeft=_SMALL_SIZE,
      ~width=80.0->dp,
      ~justifyContent=`center,
      (),
    ),
  "headerBarLeftButtonText": style(~color=_TEXT_COLOR, ()),
  "headerBarRightButton":
    style(~width=80.0->dp, ~flexDirection=`rowReverse, ()),
  "bottomBar":
    style(
      ~height=44.0->dp,
      ~flexDirection=`row,
      ~justifyContent=`spaceBetween,
      ~paddingHorizontal=_MEDIUM_SIZE,
      (),
    ),
};

let default: Js.t('a) = ReactNative.StyleSheet.create(styles);
