open ReactNative;

module SvgXml = {
  [@react.component] [@bs.module "react-native-svg"]
  external make: (~xml: string, ~override: Js.t('a)) => React.element =
    "SvgXml";
};

[@bs.module "../icons/email"] external email: string = "default";

let xmlFromIcon = icon =>
  switch (icon) {
  | "email" => Some(email)
  | _ => None
  };

[@react.component]
let make = (~icon, ~size, ~color, ~wrapperStyle) => {
  switch (xmlFromIcon(icon)) {
  | None => ReasonReact.null
  | Some(xml) =>
    <View
      style={StyleSheet.flatten([|
        Style.(
          style(
            ~display=`flex,
            ~alignItems=`center,
            ~justifyContent=`center,
            ~width=size->dp,
            ~height=size->dp,
            (),
          )
        ),
        wrapperStyle,
      |])}>
      <SvgXml xml override={"width": size, "height": size, "fill": color} />
    </View>
  };
};

let default = make;
