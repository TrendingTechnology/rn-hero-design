// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Hero_Theme from "../themes/hero/Hero_Theme.bs.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as ReactNative from "react-native";

function ListItem$Wrapper(Props) {
  var onPress = Props.onPress;
  var style = Props.style;
  var children = Props.children;
  if (onPress !== undefined) {
    return React.createElement(ReactNative.TouchableOpacity, {
                style: style,
                onPress: onPress,
                children: children
              });
  } else {
    return React.createElement(ReactNative.View, {
                style: style,
                children: children
              });
  }
}

var Wrapper = {
  make: ListItem$Wrapper
};

var emptyStyle = { };

function ListItem(Props) {
  var title = Props.title;
  var subtitle = Props.subtitle;
  var onPress = Props.onPress;
  var leftElement = Props.leftElement;
  var rightElement = Props.rightElement;
  var wrapperStyle = Props.wrapperStyle;
  var titleStyle = Props.titleStyle;
  var subtitleStyle = Props.subtitleStyle;
  var match = Props.theme;
  var theme = match !== undefined ? Caml_option.valFromOption(match) : Hero_Theme.$$default;
  var tmp = {
    style: ReactNative.StyleSheet.flatten(/* array */[
          theme.listItem.styles.wrapper,
          Belt_Option.getWithDefault(wrapperStyle, emptyStyle)
        ]),
    children: null
  };
  if (onPress !== undefined) {
    tmp.onPress = Caml_option.valFromOption(onPress);
  }
  return React.createElement(ListItem$Wrapper, tmp, React.createElement(ReactNative.View, {
                  style: theme.listItem.styles.contentWrapper,
                  children: null
                }, Belt_Option.getWithDefault(leftElement, null), React.createElement(ReactNative.View, {
                      children: null
                    }, React.createElement(ReactNative.Text, {
                          style: ReactNative.StyleSheet.flatten(/* array */[
                                theme.listItem.styles.title,
                                Belt_Option.getWithDefault(titleStyle, emptyStyle)
                              ]),
                          children: title
                        }), subtitle !== undefined ? React.createElement(ReactNative.Text, {
                            style: ReactNative.StyleSheet.flatten(/* array */[
                                  theme.listItem.styles.subtitle,
                                  Belt_Option.getWithDefault(subtitleStyle, emptyStyle)
                                ]),
                            children: Caml_option.valFromOption(subtitle)
                          }) : null)), Belt_Option.getWithDefault(rightElement, null));
}

var $pipe$pipe$eq = Belt_Option.getWithDefault;

var make = ListItem;

var $$default = ListItem;

export {
  Wrapper ,
  $pipe$pipe$eq ,
  emptyStyle ,
  make ,
  $$default ,
  $$default as default,
  
}
/* react Not a pure module */