open ReactNative;

type variant =
  | Filled
  | Outlined;

let getStylesByVariant = (variant: variant, theme: Js.t('a)) => {
  switch (variant) {
  | Filled => {
      "wrapper": theme##styles##filledWrapper,
      "text": theme##styles##filledText,
      "loadingIndicator": {
        "color": theme##variables##_FILLED_TEXT_COLOR,
      },
    }
  | Outlined => {
      "wrapper": theme##styles##outlinedWrapper,
      "text": theme##styles##outlinedText,
      "loadingIndicator": {
        "color": theme##variables##_OUTLINED_TEXT_COLOR,
      },
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
      ~variant=Filled,
      ~theme=Hero_Theme.default,
      ~wrapperStyle=Style.style(),
      ~textStyle=Style.style(),
    ) => {
  let styles = getStylesByVariant(variant, theme##button);

  module Wrapper = {
    let style =
      StyleSheet.flatten([|
        theme##button##styles##wrapper,
        styles##wrapper,
        disabled ? theme##button##styles##disabledWrapper : Style.style(),
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
           color=styles##loadingIndicator##color
         />
       : <Text
           style={StyleSheet.flatten([|
             theme##button##styles##text,
             styles##text,
             disabled ? theme##button##styles##disabledText : Style.style(),
             textStyle,
           |])}>
           text->React.string
         </Text>}
  </Wrapper>;
};

/* let default = Helpers.injectTheme(make); */
let default = make;
