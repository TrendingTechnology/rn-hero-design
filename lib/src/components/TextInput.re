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
      ~defaultValue=?,
      ~value=?,
      ~onChange=noop,
      ~onChangeText=noop,
      ~onSelectionChange=noop,
      ~onKeyPress=noop,
      ~onFocus=noop,
      ~onBlur=noop,
      ~onPressIcon=noop,
      ~rightIcon="",
      ~disabled=false,
      ~error="",
      ~autoFocus=false,
      ~autoCorrect=false,
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
  let (focused, setFocused) = React.useState(() => false);
  let (internalValue, setInternalValue) = React.useState(() => defaultValue);

  let isUncontrolled = Belt.Option.isNone(value);
  let placeholder_ =
    switch (placeholder, focused) {
    | ("", true) => ""
    | ("", false) => label
    | _ => placeholder
    };
  /* defaultValue triggers re-render! So we need to handle showing label on defaultValue changed */
  let label_ =
    switch (value, internalValue, defaultValue, focused) {
    | (_, _, _, true) => label
    | (Some(value), _, _, _) when !isEmpty(value) => label
    | (None, Some(internalValue), _, _) when !isEmpty(internalValue) => label
    | (None, None, Some(defaultValue), _) when !isEmpty(defaultValue) => label
    | (None, Some(""), Some(defaultValue), _) when !isEmpty(defaultValue) => label
    | _ => ""
    };
  let keyboardType_ =
    keyboardType
    ->Belt.Option.flatMap(keyboardTypeFromJs)
    ->Belt.Option.getWithDefault(`default);

  let handleFocus =
    React.useCallback2(
      _ => {
        setFocused(_ => true);
        onFocus();
        ();
      },
      (onFocus, setFocused),
    );

  let handleBlur =
    React.useCallback2(
      _ => {
        setFocused(_ => false);
        onBlur();
        ();
      },
      (onBlur, setFocused),
    );

  let handleChangeText =
    React.useCallback2(
      text => {
        if (isUncontrolled) {
          setInternalValue(_ => Some(text));
        };
        onChangeText(text);
        ();
      },
      (onChangeText, setInternalValue),
    );

  <View
    style={StyleSheet.flatten([|theme##textInput##wrapper, wrapperStyle|])}>
    <Text
      style={StyleSheet.flatten([|
        theme##textInput##label,
        focused ? theme##textInput##activeLabel : emptyStyle,
        !isEmpty(error) ? theme##textInput##errorLabel : emptyStyle,
        labelStyle,
      |])}>
      label_->React.string
    </Text>
    <View
      style={StyleSheet.flatten([|
        theme##textInput##textInput,
        focused ? theme##textInput##activeTextInput : emptyStyle,
        !isEmpty(error) ? theme##textInput##errorTextInput : emptyStyle,
        inputStyle,
      |])}>
      <ReactNative.TextInput
        testID
        placeholder=placeholder_
        keyboardType=keyboardType_
        ?defaultValue
        ?value
        onChange
        onChangeText=handleChangeText
        onSelectionChange
        onKeyPress
        onFocus=handleFocus
        onBlur=handleBlur
        editable={!disabled}
        autoFocus
        autoCorrect
        secureTextEntry
        multiline
        scrollEnabled=false
        placeholderTextColor={theme##textInput##placeholder->getColorProperty}
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
      <TouchableWithoutFeedback onPress=onPressIcon>
        <View>
          <Icon
            icon=rightIcon
            size=20.0
            color={
              StyleSheet.flatten([|
                theme##textInput##icon,
                focused ? theme##textInput##activeIcon : emptyStyle,
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
