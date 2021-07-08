open ReactNative

@genType @deriving(jsConverter)
type variant = [#error | #warning | #success | #info]

let getStylesByVariant = (variant: option<variant>, styles: 'a) =>
  variant->Belt.Option.mapWithDefault(
    {"wrapper": styles["infoWrapper"], "content": styles["infoContent"]},
    x =>
      switch x {
      | #error => {
          "wrapper": styles["errorWrapper"],
          "content": styles["errorContent"],
        }

      | #warning => {
          "wrapper": styles["warningWrapper"],
          "content": styles["warningContent"],
        }

      | #success => {
          "wrapper": styles["successWrapper"],
          "content": styles["successContent"],
        }
      | _ => {"wrapper": styles["infoWrapper"], "content": styles["infoContent"]}
      },
  )

let emptyStyle = Style.style()

@genType @react.component
let make = (
  ~variant,
  ~content,
  ~wrapperStyle=emptyStyle,
  ~contentStyle=emptyStyle,
  ~theme=Hero_Theme.default,
) => {
  let styles = variant->getStylesByVariant(theme["badge"])

  <View style={StyleSheet.flatten([theme["badge"]["wrapper"], styles["wrapper"], wrapperStyle])}>
    <Text style={StyleSheet.flatten([theme["badge"]["content"], styles["content"], contentStyle])}>
      {content->React.string}
    </Text>
  </View>
}

@genType
let default = Helpers.injectTheme(make)
