open ReactNative;

let isEmpty = str => String.length(str) == 0;

let emptyStyle = Style.style();

let noop = _ => ();

[@bs.deriving jsConverter]
type keyboardType = [
  | `default
  | [@bs.as "number-pad"] `numberPad
  | [@bs.as "decimal-pad"] `decimalPad
  | `numeric
  | [@bs.as "email-address"] `emailAddress
  | [@bs.as "phone-pad"] `phonePad
  | [@bs.as "ascii-capable"] `asciiCapable
  | [@bs.as "numbers-and-punctuation"] `numbersAndPunctuation
  | `url
  | [@bs.as "name-phone-pad"] `namePhonePad
  | `twitter
  | [@bs.as "web-search"] `webSearch
  | [@bs.as "visible-password"] `visiblePassword
];

[@bs.get] external getColorProperty: Style.t => Color.t = "color";

[@react.component]
let make =
    (
      ~testID="",
      ~label="",
      ~placeholder="",
      ~keyboardType: option(string)=?,
      ~value=?,
      ~onTouch=noop,
      ~onPressIcon=noop,
      ~rightIcon="",
      ~disabled=false,
      ~error="",
      ~secureTextEntry=false,
      ~multiline=false,
      ~wrapperStyle=emptyStyle,
      ~labelStyle=emptyStyle,
      ~inputStyle=emptyStyle,
      ~iconStyle=emptyStyle,
      ~errorStyle=emptyStyle,
      ~children=React.null,
      ~theme=Hero_Theme.default,
    ) => {
  let placeholder_ =
    switch (placeholder) {
    | "" => label
    | _ => placeholder
    };
  let label_ =
    switch (value) {
    | Some(value) when !isEmpty(value) => label
    | _ => ""
    };
  let keyboardType_ =
    keyboardType
    ->Belt.Option.flatMap(keyboardTypeFromJs)
    ->Belt.Option.getWithDefault(`default);

  <View
    style={StyleSheet.flatten([|theme##textInput##wrapper, wrapperStyle|])}>
    <Text
      style={StyleSheet.flatten([|
        theme##textInput##label,
        !isEmpty(error) ? theme##textInput##errorLabel : emptyStyle,
        labelStyle,
      |])}>
      label_->React.string
    </Text>
    <View
      style={StyleSheet.flatten([|
        theme##textInput##textInput,
        !isEmpty(error) ? theme##textInput##errorTextInput : emptyStyle,
        inputStyle,
      |])}>
      <TouchableOpacity
        activeOpacity={disabled ? 1.0 : 0.2}
        onPress={disabled ? noop : onTouch}
        style={Style.style(~flex=1.0, ())}>
        <ReactNative.TextInput
          testID
          placeholder=placeholder_
          keyboardType=keyboardType_
          ?value
          editable=false
          pointerEvents=`none
          secureTextEntry
          multiline
          scrollEnabled=false
          placeholderTextColor={
            theme##textInput##placeholder->getColorProperty
          }
          style={StyleSheet.flatten([|
            theme##textInput##baseTextInput,
            !
              Js.Nullable.isNullable(
                inputStyle->getColorProperty->Js.Nullable.return,
              )
              ? Style.style(~color=inputStyle->getColorProperty, ())
              : emptyStyle,
            disabled ? theme##textInput##disabledBaseTextInput : emptyStyle,
          |])}>
          children
        </ReactNative.TextInput>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={disabled ? noop : onPressIcon}>
        <View>
          <Icon
            icon=rightIcon
            size=20.0
            color={
              StyleSheet.flatten([|
                theme##textInput##icon,
                !isEmpty(error) ? theme##textInput##errorIcon : emptyStyle,
                iconStyle,
              |])
              ->getColorProperty
            }
            wrapperStyle={theme##textInput##icon}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
    <Text
      style={StyleSheet.flatten([|
        theme##textInput##errorMessage,
        errorStyle,
      |])}>
      error->React.string
    </Text>
  </View>;
};

let default = Helpers.injectTheme(make);
