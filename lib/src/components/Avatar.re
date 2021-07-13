open ReactNative;

let (||=) = Belt.Option.getWithDefault;

let emptyStyle = Style.style();

type stylesBySize = {
  .
  "wrapper": Style.t,
  "title": Style.t,
  "titleWrapper": Style.t,
  "image": Style.t,
};

[@genType]
[@bs.deriving jsConverter]
type size = [ | `small | `large | `medium];

let getStylesBySize: (option(size), Js.t('a)) => stylesBySize =
  (size, styles) => {
    let mediumSizeStyles = {
      "wrapper": styles##mediumWrapper,
      "titleWrapper": styles##mediumTitleWrapper,
      "title": styles##mediumTitle,
      "image": styles##mediumImage,
    };
    let largeSizeStyles = {
      "wrapper": styles##largeWrapper,
      "titleWrapper": styles##largeTitleWrapper,
      "title": styles##largeTitle,
      "image": styles##largeImage,
    };
    let smallSizeStyles = {
      "wrapper": styles##smallWrapper,
      "titleWrapper": styles##smallTitleWrapper,
      "title": styles##smallTitle,
      "image": styles##smallImage,
    };
    size->Belt.Option.mapWithDefault(
      mediumSizeStyles,
      fun
      | `large => largeSizeStyles
      | `small => smallSizeStyles
      | _ => mediumSizeStyles,
    );
  };

[@genType]
[@react.component]
let make =
    (
      ~source=?,
      ~size: option(size)=?,
      ~title="",
      ~wrapperStyle=?,
      ~titleStyle=?,
      ~theme=Hero_Theme.default,
      ~testID=?,
    ) => {
  let styles: stylesBySize = size->getStylesBySize(theme##avatar);

  <View
    ?testID
    style={StyleSheet.flatten([|
      theme##avatar##wrapper,
      styles##wrapper,
      wrapperStyle ||= emptyStyle,
    |])}>
    <View
      style={StyleSheet.flatten([|
        theme##avatar##titleWrapper,
        styles##titleWrapper,
      |])}>
      <Text
        style={StyleSheet.flatten([|
          theme##avatar##title,
          styles##title,
          titleStyle ||= emptyStyle,
        |])}>
        title->React.string
      </Text>
    </View>
    {switch (source) {
     | Some(source') =>
       <Image
         resizeMode=`cover
         source={
           Image.uriSource(~uri=source', ())->Image.Source.fromUriSource
         }
         style={StyleSheet.flatten([|theme##avatar##image, styles##image|])}
       />
     | None => ReasonReact.null
     }}
  </View>;
};

[@genType]
let default = Helpers.injectTheme(make);
