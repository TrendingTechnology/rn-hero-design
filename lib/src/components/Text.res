open ReactNative

let emptyStyle = Style.style()

@genType @deriving(jsConverter)
type weight = [
  | @as("100") #_100
  | @as("200") #_200
  | @as("300") #_300
  | @as("400") #_400
  | @as("500") #_500
  | @as("600") #_600
  | @as("700") #_700
  | @as("800") #_800
  | @as("900") #_900
  | #bold
  | #normal
]

@genType @deriving(jsConverter)
type ellipsizeMode = [#clip | #head | #middle | #tail]

let \"|?" = (x, y) =>
  switch x {
  | Some(x) => x
  | None => y
  }

@genType @deriving(jsConverter)
type size = [#h1 | #h2 | #h3 | #h4 | #h5]

@genType @react.component
let make = (
  ~testID=?,
  ~children,
  ~size: option<size>=?,
  ~weight=?,
  ~color=?,
  ~ellipsizeMode=?,
  ~numberOfLines=?,
  ~onPress=?,
  ~style=?,
  ~theme=Hero_Theme.default,
) =>
  <ReactNative.Text
    ?testID
    ellipsizeMode=?{ellipsizeMode->Belt.Option.flatMap(ellipsizeModeFromJs)}
    ?numberOfLines
    ?onPress
    style={StyleSheet.flatten([
      theme["text"]["text"],
      Belt.Option.mapWithDefault(size, emptyStyle, size =>
        switch size {
        | #h1 => theme["text"]["h1"]
        | #h2 => theme["text"]["h2"]
        | #h3 => theme["text"]["h3"]
        | #h4 => theme["text"]["h4"]
        | #h5 => theme["text"]["h5"]
        | _ => emptyStyle
        }
      ),
      Style.style(
        ~fontWeight=weight->Belt.Option.flatMap(weightFromJs)->Belt.Option.getWithDefault(#_400),
        ~color?,
        (),
      ),
      \"|?"(style, emptyStyle),
    ])}>
    {children |> React.string}
  </ReactNative.Text>

@genType
let default = Helpers.injectTheme(make)
