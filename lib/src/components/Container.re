open ReactNative;

let noStyle = Style.style();

let (|?) = (x, y) =>
  switch (x) {
  | Some(x) => x
  | None => y
  };

[@react.component]
let make =
    (
      ~children,
      ~fluid=false,
      ~direction=`column,
      ~style=?,
      ~theme=Hero_Theme.default,
    ) => {
  <View
    style={StyleSheet.flatten([|
      theme##container##container,
      fluid ? theme##container##fluid : noStyle,
      Style.style(~flexDirection=direction, ()),
      style |? noStyle,
    |])}>
    children
  </View>;
};

let default = make;
