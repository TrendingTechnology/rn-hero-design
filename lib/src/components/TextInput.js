import React from 'react';
import t from 'prop-types';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from './Icon';
import injectTheme from '../helpers/injectTheme';
import composeStyles from '../helpers/composeStyles';
import noop from '../helpers/noop';

class TextInput extends React.Component {
  state = {
    focused: false,
  };

  handleFocus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
  };

  handleBlur = () => {
    this.setState({ focused: false });
    this.props.onBlur();
  };

  render() {
    const { focused } = this.state;
    const {
      label,
      value,
      onChange,
      onChangeText,
      onPressIcon,
      rightIcon,
      disabled,
      error,
      autoFocus,
      secureTextEntry,
      multiline,
      wrapperStyle = {},
      labelStyle = {},
      inputStyle = {},
      iconStyle = {},
      errorStyle = {},
      theme,
      ...props
    } = this.props;

    return (
      <View style={StyleSheet.flatten([theme.textInput.wrapper, wrapperStyle])}>
        <Text
          style={StyleSheet.flatten([
            theme.textInput.label,
            focused ? theme.textInput.activeLabel : null,
            error ? theme.textInput.errorLabel : null,
            labelStyle,
          ])}
        >
          {focused || value ? label : ''}
        </Text>
        <View
          style={StyleSheet.flatten([
            theme.textInput.textInput,
            focused ? theme.textInput.activeTextInput : null,
            error ? theme.textInput.errorTextInput : null,
            inputStyle,
          ])}
        >
          <RNTextInput
            placeholder={focused ? '' : label}
            value={value}
            onChange={onChange}
            onChangeText={onChangeText}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            editable={!disabled}
            autoFocus={autoFocus}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            scrollEnabled={false}
            placeholderTextColor={
              composeStyles([
                theme.textInput.baseTextInput,
                inputStyle,
                disabled ? theme.textInput.disabledBaseTextInput : null,
              ]).color
            }
            style={StyleSheet.flatten([
              theme.textInput.baseTextInput,
              inputStyle.color ? { color: inputStyle.color } : null,
              disabled ? theme.textInput.disabledBaseTextInput : null,
            ])}
            {...props}
          />
          <TouchableWithoutFeedback onPress={onPressIcon}>
            <Icon
              icon={rightIcon}
              size={20}
              color={
                composeStyles([
                  theme.textInput.icon,
                  focused ? theme.textInput.activeIcon : null,
                  error ? theme.textInput.errorIcon : null,
                  iconStyle,
                ]).color
              }
              wrapperStyle={theme.textInput.icon}
            />
          </TouchableWithoutFeedback>
        </View>
        <Text
          style={StyleSheet.flatten([theme.textInput.errorMessage, errorStyle])}
        >
          {error}
        </Text>
      </View>
    );
  }
}

TextInput.propTypes = {
  /**
   * The label and placeholder of text input
   */
  label: t.string,
  value: t.string,
  onChange: t.func,
  onChangeText: t.func,
  onPressIcon: t.func,
  rightIcon: t.string,
  disabled: t.bool,
  error: t.string,
  autoFocus: t.bool,
  secureTextEntry: t.bool,
  multiline: t.bool,
  wrapperStyle: t.object,
  labelStyle: t.object,
  inputStyle: t.object,
  iconStyle: t.object,
  errorStyle: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

TextInput.defaultProps = {
  onFocus: noop,
  onBlur: noop,
};

export default injectTheme(TextInput);
