open ReactNative;

type variant = [ | `filled | `outlined];

module ButtonVariant: {
  type t;
  [@bs.inline "filled"]
  let filled: t;
  [@bs.inline "outlined"]
  let outlined: t;
} = {
  type t = string;
  [@bs.inline]
  let filled = "filled";
  [@bs.inline]
  let outlined = "outlined";
};

[@bs.get] external getColorProperty: Style.t => Color.t = "color";

let getStylesByVariant = (variant: ButtonVariant.t, styles: Js.t('a)) => {
  ButtonVariant.(
    switch (variant) {
    | v when v === outlined => {
        "wrapper": styles##outlinedWrapper,
        "text": styles##outlinedText,
        "loadingIndicator": styles##outlinedLoadingIndicator,
      }
    | _ => {
        "wrapper": styles##filledWrapper,
        "text": styles##filledText,
        "loadingIndicator": styles##filledLoadingIndicator,
      }
    }
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
      ~variant: ButtonVariant.t,
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
