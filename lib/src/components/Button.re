open ReactNative;

[@bs.module "../helpers/injectTheme.js"]
external injectTheme: React.component('a) => React.component('a) = "default";

module ThemeComponent = {
  let theme = Hero_Theme.default;
  let make = (~render) => {
    render(theme);
  };
};

type variant =
  | Filled
  | Outlined;

let getStylesByVariant = (variant: variant, styles: Js.t('a)) => {
  switch (variant) {
  | Filled => {
      "wrapper": styles##filledWrapper,
      "text": styles##filledText,
      "loadingIndicator": styles##filledLoadingIndicator,
    }
  | Outlined => {
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
      ~variant=Filled,
      ~theme=Hero_Theme.default,
      ~wrapperStyle=Style.style(),
      ~textStyle=Style.style(),
    ) => {
  let styles = getStylesByVariant(variant, theme##button);

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
       ? <ActivityIndicator size=ActivityIndicator.Size.small />
       : <Text
           style={StyleSheet.flatten([|
             theme##button##text,
             styles##text,
             disabled ? theme##button##disabledWrapper : Style.style(),
             textStyle,
           |])}>
           text->React.string
         </Text>}
  </Wrapper>;
};

/* ThemeComponent.make(~render=theme => */
/*   <Wrapper> */
/*     <Text> {(text ++ string_of_int(theme))->React.string} </Text> */
/*   </Wrapper> */
/* ); */

let default = make;
