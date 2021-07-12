open ReactNative;

[@genType]
[@bs.deriving jsConverter]
type variant = [ | `outlined | `filled];

[@bs.get] external getColorProperty: Style.t => Color.t = "color";

let getStylesByVariant = (variant: option(variant), styles: Js.t('a)) => {
  let filledStyle = {
    "wrapper": styles##filledWrapper,
    "text": styles##filledText,
    "loadingIndicator": styles##filledLoadingIndicator,
  };

  let outlinedStyle = {
    "wrapper": styles##outlinedWrapper,
    "text": styles##outlinedText,
    "loadingIndicator": styles##outlinedLoadingIndicator,
  };

  variant->Belt.Option.mapWithDefault(
    filledStyle,
    fun
    | `outlined => outlinedStyle
    | _ => filledStyle,
  );
};

[@genType]
[@react.component]
let make =
    (
      ~testID=?,
      ~text,
      ~onPress,
      ~loading=false,
      ~disabled=false,
      ~variant: option(variant),
      ~theme=Hero_Theme.default,
      ~wrapperStyle=Style.style(),
      ~textStyle=Style.style(),
    ) => {
  let styles = variant->getStylesByVariant(theme##button);

  module Wrapper = {
    let style =
      StyleSheet.flatten([|
        theme##button##wrapper,
        styles##wrapper,
        disabled ? theme##button##disabledWrapper : Style.style(),
        wrapperStyle,
      |]);

    [@react.component]
    let make = (~children): React.element =>
      loading || disabled
        ? <View ?testID style> children </View>
        : <TouchableOpacity ?testID activeOpacity=0.2 onPress style>
            children
          </TouchableOpacity>;
  };

  <Wrapper>
    {loading && !disabled
       ? <ActivityIndicator
           size=ActivityIndicator.Size.small
           color={getColorProperty(styles##loadingIndicator)}
         />
       : <Text
           style={StyleSheet.flatten([|
             theme##button##text,
             styles##text,
             disabled ? theme##button##disabledText : Style.style(),
             textStyle,
           |])}>
           text->React.string
         </Text>}
  </Wrapper>;
};

[@genType]
let default = Helpers.injectTheme(make);
