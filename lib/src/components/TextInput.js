import React from 'react';
import t from 'prop-types';
import { View, Text, TextInput as RNTextInput, StyleSheet } from 'react-native';
import Icon from './Icon';
import heroTheme from '../themes/hero';

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
      onChange,
      rightIcon,
      disabled,
      error,
      autoFocus,
      secureTextEntry,
      wrapperStyle,
      inputStyle,
      theme = heroTheme,
    } = this.props;

    return (
      <View style={StyleSheet.flatten([theme.textInput.wrapper, wrapperStyle])}>
        <Text
          style={StyleSheet.flatten([
            theme.textInput.label,
            error ? theme.textInput.errorLabel : null,
          ])}
        >
          {focused || value ? label : ''}
        </Text>
        <View
          style={StyleSheet.flatten([
            theme.textInput.textInput,
            error ? theme.textInput.errorTextInput : null,
            inputStyle,
          ])}
        >
          <RNTextInput
            placeholder={focused ? '' : label}
            value={value}
            onTextChange={onChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            editable={!disabled}
            autoFocus={autoFocus}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={
              disabled
                ? theme.textInput.disabledBaseTextInput.color
                : theme.textInput.baseTextInput.color
            }
            style={StyleSheet.flatten([
              theme.textInput.baseTextInput,
              disabled ? theme.textInput.disabledBaseTextInput : null,
            ])}
          />
          <Icon
            icon={rightIcon}
            color={
              error
                ? theme.textInput.errorIcon.color
                : theme.textInput.icon.color
            }
          />
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
  onChange: t.func.isRequired,
  rightIcon: t.string,
  disabled: t.bool,
  error: t.string,
  autoFocus: t.bool,
  secureTextEntry: t.bool,
  wrapperStyle: t.object,
  inputStyle: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default TextInput;
