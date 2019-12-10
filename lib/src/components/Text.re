module RN = ReactNative;
module RNText = RN.Text;

let noStyle = RN.Style.style();

[@bs.deriving jsConverter]
type size = [ | `h1 | `h2 | `h3 | `h4 | `h5];

[@bs.deriving jsConverter]
type weight = [
  | [@bs.as "300"] `_300
  | [@bs.as "400"] `_400
  | [@bs.as "500"] `_500
  | [@bs.as "600"] `_600
  | [@bs.as "700"] `_700
];

let toRNWeight =
  fun
  | `_300 => `_300
  | `_400 => `_400
  | `_500 => `_500
  | `_600 => `_600
  | `_700 => `_700;

let (|?) = (x, y) =>
  switch (x) {
  | None => y
  | Some(x) => x
  };

[@react.component]
let make =
    (
      ~children,
      ~style=?,
      ~size=?,
      ~weight=?,
      ~color=?,
      ~theme=Hero_Theme.default,
    ) =>
  <RNText
    style={RN.StyleSheet.flatten([|
      theme##text##styles##text,
      Belt.Option.mapWithDefault(size, noStyle, size =>
        switch (size) {
        | `h1 => theme##text##styles##h1
        | `h2 => theme##text##styles##h2
        | `h3 => theme##text##styles##h3
        | `h4 => theme##text##styles##h4
        | `h5 => theme##text##styles##h5
        }
      ),
      RN.Style.style(
        ~fontWeight=?Belt.Option.map(weight, toRNWeight),
        ~color?,
        (),
      ),
      style |? noStyle,
    |])}>
    {children |> React.string}
  </RNText>;

let default = make;
