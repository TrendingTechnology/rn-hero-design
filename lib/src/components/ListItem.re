open ReactNative;

module Wrapper = {
  [@react.component]
  let make = (~onPress=?, ~style, ~children) =>
    switch (onPress) {
    | None => <View style> children </View>
    | Some(onPress) =>
      <TouchableOpacity onPress style> children </TouchableOpacity>
    };
};

let (||=) = Belt.Option.getWithDefault;

let emptyStyle = Style.style();

[@react.component]
let make =
    (
      ~title,
      ~subtitle=?,
      ~onPress=?,
      ~leftElement=?,
      ~rightElement=?,
      ~wrapperStyle=?,
      ~titleStyle=?,
      ~subtitleStyle=?,
      ~theme=Hero_Theme.default,
    ) => {
  <Wrapper
    style={StyleSheet.flatten([|
      theme##listItem##styles##wrapper,
      wrapperStyle ||= emptyStyle,
    |])}
    ?onPress>
    <View style={theme##listItem##styles##contentWrapper}>
      <View>
        {leftElement ||= React.null}
        <Text
          style={StyleSheet.flatten([|
            theme##listItem##styles##title,
            titleStyle ||= emptyStyle,
          |])}>
          title
        </Text>
        {switch (subtitle) {
         | None => React.null
         | Some(subtitle) =>
           <Text
             style={StyleSheet.flatten([|
               theme##listItem##styles##subtitle,
               subtitleStyle ||= emptyStyle,
             |])}>
             subtitle
           </Text>
         }}
      </View>
    </View>
    {rightElement ||= React.null}
  </Wrapper>;
};

let default = make;
