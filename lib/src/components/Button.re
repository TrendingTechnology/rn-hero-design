open ReactNative;

type variant = [ | `filled | `outlined];

let variantFromString =
  fun
  | "filled" => `filled
  | "outlined" => `outlined
  | _ => `filled;

[@bs.get] external getColorProperty: Style.t => Color.t = "color";

let getStylesByVariant = (variant: variant, styles: Js.t('a)) => {
  switch (variant) {
  | `filled => {
      "wrapper": styles##filledWrapper,
      "text": styles##filledText,
      "loadingIndicator": styles##filledLoadingIndicator,
    }
  | `outlined => {
      "wrapper": styles##outlinedWrapper,
      "text": styles##outlinedText,
      "loadingIndicator": styles##outlinedLoadingIndicator,
    }
  };
};

[@react.component]
let make =
    (
      ~text,
      ~onPress,
      ~loading=false,
      ~disabled=false,
      ~variant,
      ~theme=Hero_Theme.default,
      ~wrapperStyle=Style.style(),
      ~textStyle=Style.style(),
    ) => {
  let styles = variant->variantFromString->getStylesByVariant(theme##button);

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
        ? <View style> children </View>
        : <TouchableOpacity onPress style> children </TouchableOpacity>;
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

let default = Helpers.injectTheme(make);
