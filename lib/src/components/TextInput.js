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
import heroTheme from '../themes/hero';
import composeStyles from '../helpers/composeStyles';

class TextInput extends React.Component {
  state = {
    focused: false,
  };

  handleFocus = () => this.setState({ focused: true });

  handleBlur = () => this.setState({ focused: false });

  render() {
    const { focused } = this.state;
    const {
      label,
      value,
      onChangeText,
      onPressIcon,
      rightIcon,
      disabled,
      error,
      autoFocus,
      secureTextEntry,
      wrapperStyle = {},
      labelStyle = {},
      inputStyle = {},
      iconStyle = {},
      theme = heroTheme,
    } = this.props;

    return (
      <View style={StyleSheet.flatten([theme.textInput.wrapper, wrapperStyle])}>
        <Text
          style={StyleSheet.flatten([
            theme.textInput.label,
            labelStyle,
            error ? theme.textInput.errorLabel : null,
          ])}
        >
          {focused || value ? label : ''}
        </Text>
        <View
          style={StyleSheet.flatten([
            theme.textInput.textInput,
            inputStyle,
            error ? theme.textInput.errorTextInput : null,
          ])}
        >
          <RNTextInput
            placeholder={focused ? '' : label}
            value={value}
            onChangeText={onChangeText}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            editable={!disabled}
            autoFocus={autoFocus}
            secureTextEntry={secureTextEntry}
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
          />
          <TouchableWithoutFeedback onPress={onPressIcon}>
            <Icon
              icon={rightIcon}
              color={
                composeStyles([
                  theme.textInput.icon,
                  iconStyle,
                  error ? theme.textInput.errorIcon : null,
                ]).color
              }
              wrapperStyle={theme.textInput.icon}
            />
          </TouchableWithoutFeedback>
        </View>
        <Text style={theme.textInput.errorMessage}>{error}</Text>
      </View>
    );
  }
}

TextInput.propTypes = {
  /**
   * The label and placeholder of text input
   */
  label: t.string.isRequired,
  value: t.string.isRequired,
  onChangeText: t.func.isRequired,
  onPressIcon: t.func,
  rightIcon: t.string,
  disabled: t.bool,
  error: t.string,
  autoFocus: t.bool,
  secureTextEntry: t.bool,
  wrapperStyle: t.object,
  labelStyle: t.object,
  inputStyle: t.object,
  iconStyle: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default TextInput;
