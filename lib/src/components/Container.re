open ReactNative;

[@genType]
[@bs.deriving jsConverter]
type containerDirection = [ | `column | `row | `columnReverse | `rowReverse];

let noStyle = Style.style();

let (|?) = (x, y) =>
  switch (x) {
  | Some(x) => x
  | None => y
  };

[@genType]
[@react.component]
let make =
    (
      ~children,
      ~fluid=false,
      ~direction: option(containerDirection)=?,
      ~style=?,
      ~theme=Hero_Theme.default,
    ) => {
  let direction = direction->Belt.Option.getWithDefault(`column);
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

[@genType]
let default = Helpers.injectTheme(make);
