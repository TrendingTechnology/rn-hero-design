open ReactNative;

[@genType]
[@bs.deriving jsConverter]
type variant = [ | `error | `warning | `success | `info];

let getStylesByVariant = (variant: option(variant), styles: Js.t('a)) => {
  variant->Belt.Option.mapWithDefault(
    {"wrapper": styles##infoWrapper, "content": styles##infoContent},
    fun
    | `error => {
        "wrapper": styles##errorWrapper,
        "content": styles##errorContent,
      }

    | `warning => {
        "wrapper": styles##warningWrapper,
        "content": styles##warningContent,
      }

    | `success => {
        "wrapper": styles##successWrapper,
        "content": styles##successContent,
      }
    | _ => {"wrapper": styles##infoWrapper, "content": styles##infoContent},
  );
};

let emptyStyle = Style.style();

[@genType]
[@react.component]
let make =
    (
      ~variant,
      ~content,
      ~wrapperStyle=emptyStyle,
      ~contentStyle=emptyStyle,
      ~theme=Hero_Theme.default,
    ) => {
  let styles = variant->getStylesByVariant(theme##message);

  <View
    style={StyleSheet.flatten([|
      theme##message##wrapper,
      styles##wrapper,
      wrapperStyle,
    |])}>
    <Text
      style={StyleSheet.flatten([|
        theme##message##content,
        styles##content,
        contentStyle,
      |])}>
      content->React.string
    </Text>
  </View>;
};

[@genType]
let default = Helpers.injectTheme(make);
