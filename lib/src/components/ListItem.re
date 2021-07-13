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

[@genType]
[@react.component]
let make =
    (
      ~title: string,
      ~subtitle: option(string)=?,
      ~onPress=?,
      ~leftElement=?,
      ~rightElement=?,
      ~wrapperStyle=?,
      ~titleStyle=?,
      ~subtitleStyle=?,
      ~theme=Hero_Theme.default,
      ~testID=?,
    ) => {
  <Wrapper
    style={StyleSheet.flatten([|
      theme##listItem##wrapper,
      wrapperStyle ||= emptyStyle,
    |])}
    ?onPress>
    <View ?testID style={theme##listItem##contentWrapper}>
      {leftElement ||= React.null}
      <View style={theme##listItem##textWrapper}>
        <View>
          <Text
            style={StyleSheet.flatten([|
              theme##listItem##title,
              titleStyle ||= emptyStyle,
            |])}>
            title->React.string
          </Text>
          {switch (subtitle) {
           | None => React.null
           | Some(subtitle) =>
             <Text
               style={StyleSheet.flatten([|
                 theme##listItem##subtitle,
                 subtitleStyle ||= emptyStyle,
               |])}>
               subtitle->React.string
             </Text>
           }}
        </View>
      </View>
    </View>
    {rightElement ||= React.null}
  </Wrapper>;
};

[@genType]
let default = Helpers.injectTheme(make);
