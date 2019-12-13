open ReactNative;

let isEmptyString = str => String.length(str) == 0;

[@bs.get] external getColorProperty: Style.t => Color.t = "color";

[@react.component]
let make =
    (
      ~label,
      ~value,
      ~onChange,
      ~onChangeText,
      ~onFocus,
      ~onBlur,
      ~onPressIcon,
      ~rightIcon,
      ~disabled,
      ~error,
      ~autoFocus,
      ~secureTextEntry,
      ~multiline,
      ~wrapperStyle,
      ~labelStyle,
      ~inputStyle,
      ~iconStyle,
      ~errorStyle,
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
        focused ? theme##textInput##activeLabel : Style.style(),
        !isEmptyString(error) ? theme##textInput##errorLabel : Style.style(),
        labelStyle,
      |])}>
      (focused || !isEmptyString(value) ? label : "")->React.string
    </Text>
    <View
      style={StyleSheet.flatten([|
        theme##textInput##textInput,
        focused ? theme##textInput##activeTextInput : Style.style(),
        !isEmptyString(error)
          ? theme##textInput##errorTextInput : Style.style(),
        inputStyle,
      |])}>
      <ReactNative.TextInput
        placeholder={focused ? "" : label}
        value
        onChange
        onChangeText
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
            disabled ? theme##textInput##disabledBaseTextInput : Style.style(),
          |])
          ->getColorProperty
        }
        style={StyleSheet.flatten([|
          theme##textInput##baseTextInput,
          !isEmptyString(inputStyle->getColorProperty)
            ? Style.style(~color=inputStyle->getColorProperty, ())
            : Style.style(),
          disabled ? theme##textInput##disabledBaseTextInput : Style.style(),
        |])}
      />
      <TouchableWithoutFeedback onPress=onPressIcon>
        <Icon
          icon=rightIcon
          size=20.0
          color={
            StyleSheet.flatten([|
              theme##textInput##icon,
              focused ? theme##textInput##activeIcon : Style.style(),
              !isEmptyString(error)
                ? theme##textInput##errorIcon : Style.style(),
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

let default = make;
