open ReactNative;

let isEmptyString = str => String.length(str) == 0;

let emptyStyle = Style.style();

let noop = _ => ();

[@bs.get] external getColorProperty: Style.t => Color.t = "color";

[@react.component]
let make =
    (
      ~testID="",
      ~label="",
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

  <View
    style={StyleSheet.flatten([|theme##textInput##wrapper, wrapperStyle|])}>
    <Text
      style={StyleSheet.flatten([|
        theme##textInput##label,
        focused ? theme##textInput##activeLabel : emptyStyle,
        !isEmptyString(error) ? theme##textInput##errorLabel : emptyStyle,
        labelStyle,
      |])}>
      (focused || !isEmptyString(Belt.Option.getWithDefault(value, "")) ? label : "")->React.string
    </Text>
    <View
      style={StyleSheet.flatten([|
        theme##textInput##textInput,
        focused ? theme##textInput##activeTextInput : emptyStyle,
        !isEmptyString(error) ? theme##textInput##errorTextInput : emptyStyle,
        inputStyle,
      |])}>
      <RNTextInput
        testID
        placeholder={focused ? "" : label}
        value=?value
        onChange
        onChangeText
        onSelectionChange
        onKeyPress
        onFocus=handleFocus
        onBlur=handleBlur
        editable={!disabled}
        autoFocus
        secureTextEntry
        multiline
        scrollEnabled=false
        placeholderTextColor={
          StyleSheet.flatten([|
            theme##textInput##baseTextInput,
            inputStyle,
            disabled ? theme##textInput##disabledBaseTextInput : emptyStyle,
          |])
          ->getColorProperty
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
      </RNTextInput>
      <TouchableWithoutFeedback onPress=onPressIcon>
        <Icon
          icon=rightIcon
          size=20.0
          color={
            StyleSheet.flatten([|
              theme##textInput##icon,
              focused ? theme##textInput##activeIcon : emptyStyle,
              !isEmptyString(error)
                ? theme##textInput##errorIcon : emptyStyle,
              iconStyle,
            |])
            ->getColorProperty
          }
          wrapperStyle={theme##textInput##icon}
        />
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
