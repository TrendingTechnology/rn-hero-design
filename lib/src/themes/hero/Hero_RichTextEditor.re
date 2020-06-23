open ReactNative.Style;
open Hero_Variables;

let _TOOLBAR_BUTTON_SIZE = _LARGE_SIZE +. _SMALL_SIZE *. 2.0;

let styles: Js.t('a) = {
  "wrapper": style(~flex=1.0, ~flexDirection=`column, ()),
  "toolbar": style(~flexDirection=`row, ()),
  "toolbarButton":
    style(
      ~width=_TOOLBAR_BUTTON_SIZE->dp,
      ~height=_TOOLBAR_BUTTON_SIZE->dp,
      ~alignItems=`center,
      ~justifyContent=`center,
      ~backgroundColor="gray",
      (),
    ),
};

let default: Js.t('a) = ReactNative.StyleSheet.create(styles);
