open ReactNative

let emptyStyle = Style.style()

export type weight = [
  | @genType.as("100")
  #_100
  | @genType.as("200")
  #_200
  | @genType.as("300")
  #_300
  | @genType.as("400")
  #_400
  | @genType.as("500")
  #_500
  | @genType.as("600")
  #_600
  | @genType.as("700")
  #_700
  | @genType.as("800")
  #_800
  | @genType.as("900")
  #_900
  | @genType.as("bold")
  #bold
  | @genType.as("normal")
  #normal
]

@bs.deriving(jsConverter)
export type ellipsizeMode = [#clip | #head | #middle | #tail]

let \"|?" = (x, y) =>
  switch x {
  | Some(x) => x
  | None => y
  }

@bs.deriving(jsConverter)
export type size = [#h1 | #h2 | #h3 | #h4 | #h5]

@react.component
export make = (
  ~testID=?,
  ~children,
  ~size: option<size>=?,
  ~weight: option<weight>=?,
  ~color=?,
  ~ellipsizeMode: option<ellipsizeMode>=?,
  ~numberOfLines=?,
  ~onPress=?,
  ~style=?,
  ~theme=Hero_Theme.default,
) =>
  <ReactNative.Text
    ?testID
    ellipsizeMode=?{ellipsizeMode}
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
      Style.style(~fontWeight=weight->Belt.Option.getWithDefault(#_400), ~color?, ()),
      \"|?"(style, emptyStyle),
    ])}>
    {children}
  </ReactNative.Text>

export default = Helpers.injectTheme(make)
