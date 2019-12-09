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
  | None => `_300
  | Some(`_300) => `_300
  | Some(`_400) => `_400
  | Some(`_500) => `_500
  | Some(`_600) => `_600
  | Some(`_700) => `_700;

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
      theme##text##text,
      switch (size) {
      | Some(`h1) => theme##text##h1
      | Some(`h2) => theme##text##h2
      | Some(`h3) => theme##text##h3
      | Some(`h4) => theme##text##h4
      | Some(`h5) => theme##text##h5
      | None => RN.Style.style()
      },
      RN.Style.style(~fontWeight=toRNWeight(weight), ~color?, ()),
      style |? noStyle,
    |])}>
    {children |> React.string}
  </RNText>;

let default = make;
